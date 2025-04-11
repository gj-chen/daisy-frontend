  import React, { useState, useEffect, useRef } from 'react';
  import ChatWindow from '../components/ChatWindow';
  import ChatInput from '../components/ChatInput';
  import MoodboardCanvas from '../components/MoodboardCanvas';
  import FinalMoodboardModal from '../components/FinalMoodboardModal';
  import CTAButtons from '../components/CTAButtons';

  const BACKEND_URL = 'https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev';

  const ChatPage = () => {
    const chatEndRef = useRef(null);

    const [messages, setMessages] = useState([
      {
        role: 'daisy',
        text: "Let's look at some vibes together. I'll show you a few directions and you tell me what feels like you."
      }
    ]);

    const [imageUrls, setImageUrls] = useState([]);
    const [feedbackState, setFeedbackState] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [finalData, setFinalData] = useState({ summary: '', rationales: [] });
    const [showModal, setShowModal] = useState(false);
    const [daisyThinking, setDaisyThinking] = useState(false);
    const [toolUsed, setToolUsed] = useState(false);
    const [feedbackRefining, setFeedbackRefining] = useState(false);
    const [isRefining, setIsRefining] = useState(false);

    const FEEDBACK_THRESHOLD = 3;
    const lastDaisyMessageRef = useRef(null);
    const showCTAs = imageUrls.length > 0;

    const sendMessage = async (text, actionType = null) => {
      if (!text.trim()) return;

      setDaisyThinking(true);
      setToolUsed(false);
      setMessages((prev) => [...prev, { role: 'user', text }]);

      if (text.toLowerCase().includes("refine based on feedback")) {
        setFeedbackRefining(true);
      }

      if (actionType === 'refine') {
        setMessages((prev) => [...prev, { role: 'system', text: 'Daisy is refining your moodboard...' }]);
      } else if (actionType === 'regenerate') {
        setMessages((prev) => [...prev, { role: 'system', text: 'Daisy is generating a new look...' }]);
      }

      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        message: text,
        userId: 'demo-user',
        refinement: actionType === 'refine'
        }),
      });

      const data = await res.json();
      setDaisyThinking(false);
      setToolUsed(!!data.toolUsed);

      if (data.messages) {
        const newDaisyMessages = data.messages.filter(
          (msg) => msg.role === 'assistant' && msg.text !== lastDaisyMessageRef.current
        );

        if (newDaisyMessages.length > 0) {
          lastDaisyMessageRef.current = newDaisyMessages[newDaisyMessages.length - 1].text;
          setMessages((prev) => [...prev, ...newDaisyMessages]);
        }
      }

      if (data.toolUsed && data.moodboard?.images) {
        setImageUrls(data.moodboard.images);
        setFeedbackState({});
        setLikeCount(0);
        setDislikeCount(0);
      }

      setFeedbackRefining(false);
    };

    const handleImageFeedback = (imageUrl, type) => {
      const updated = {
        ...feedbackState,
        [imageUrl]: feedbackState[imageUrl] === type ? null : type
      };
      setFeedbackState(updated);

      const newLikes = Object.values(updated).filter(v => v === 'like').length;
      const newDislikes = Object.values(updated).filter(v => v === 'dislike').length;
      setLikeCount(newLikes);
      setDislikeCount(newDislikes);

      fetch(`${BACKEND_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          imageUrl,
          value: type
        })
      }).catch((err) => console.error('Feedback error:', err));
    };

    // Updated handleFinalMoodboard function with better error handling
    const handleFinalMoodboard = async (_selected, includeGuide) => {
      // Determine which images to use based on feedback
      const selected = Object.keys(feedbackState).length > 0
        ? Object.entries(feedbackState)
            .filter(([_, v]) => v === 'like')
            .map(([url]) => url)
        : imageUrls;

      // Properly extract image IDs
      const imageIds = selected.map(img => {
        if (typeof img === 'string') {
          // Try to extract ID from URL if it's a URL with ID
          const matches = img.match(/\/([a-f0-9-]{36})\.[a-z]+$/);
          return matches ? matches[1] : img;
        } else if (img && img.id) {
          return img.id;
        } else if (img && img.url) {
          // If this is an object with a URL, try to extract the ID
          const urlMatches = img.url.match(/\/([a-f0-9-]{36})\.[a-z]+$/);
          return urlMatches ? urlMatches[1] : img.url;
        }
        // Fallback to raw value (which might be an ID itself)
        return img;
      });

      setDaisyThinking(true);

      try {
        const res = await fetch(`${BACKEND_URL}/final-moodboard`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "demo-user",
            imageIds: imageIds,
            includeStylingGuide: includeGuide
          })
        });

        const data = await res.json();

        if (data.summary) {
          setFinalData({ 
            summary: data.summary, 
            rationales: data.rationales || [] 
          });
          setShowModal(true);
        } else if (data.error) {
          console.error("Error generating moodboard:", data.error);
        }
      } catch (error) {
        console.error("Network error generating moodboard:", error);
      } finally {
        setDaisyThinking(false);
      }
    };

    const handleRefineClick = async () => {
      setIsRefining(true);

      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Refine based on feedback',
          userId: 'demo-user',
          refinement: true
        })
      });

      const data = await res.json();
      const { messages: assistantMessages, moodboard, toolUsed } = data;

      if (assistantMessages) {
        setMessages(prev => [...prev, ...assistantMessages]);
      }

      if (moodboard?.images) {
        setImageUrls(moodboard.images);
        setFeedbackState({});
        setLikeCount(0);
        setDislikeCount(0);
      }

      setIsRefining(false);
    };

    useEffect(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages, imageUrls]);

    return (
      <>
        <div className="flex flex-row h-[85vh] border border-gray-200 rounded-xl shadow overflow-hidden">
          <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
            <div className="flex-1 overflow-y-auto p-6">
              <ChatWindow messages={messages} />
              <div ref={chatEndRef} />

              {(likeCount + dislikeCount) >= 2 && !isRefining && (
                <button
                  onClick={handleRefineClick}
                  className="mt-2 ml-1 text-sm text-purple-600 underline"
                >
                  Refine based on feedback
                </button>
              )}

              {isRefining ? (
                <div className="text-xs text-purple-500 italic mt-2 ml-1">
                  Daisy is refining based on what you liked…
                </div>
              ) : daisyThinking && toolUsed ? (
                <div className="text-xs text-purple-400 mt-1 ml-1">Daisy is curating your moodboard…</div>
              ) : daisyThinking ? (
                <div className="text-xs text-gray-400 mt-1 ml-1">Daisy is thinking…</div>
              ) : null}

              <CTAButtons
                onSend={sendMessage}
                onGenerateMoodboard={handleFinalMoodboard}
                showButtons={showCTAs}
              />
            </div>
            <div className="border-t border-gray-100 p-4">
              <ChatInput sendMessage={sendMessage} disabled={daisyThinking} />
            </div>
          </div>

          <div className="w-1/2 bg-gray-50 overflow-y-auto p-4">
            <MoodboardCanvas
              imageUrls={imageUrls}
              onSendMessage={sendMessage}
              onGenerateMoodboard={handleFinalMoodboard}
              onFeedback={handleImageFeedback}
              feedbackState={feedbackState}
            />
          </div>
        </div>

        <FinalMoodboardModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          summary={finalData.summary}
          images={imageUrls}
          rationales={finalData.rationales}
        />
      </>
    );
  };

  export default ChatPage;