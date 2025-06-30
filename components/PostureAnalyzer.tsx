
import React, { useState, useRef, useEffect } from 'react';
import { analyzePosture } from '../services/geminiService';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';

interface PostureAnalyzerProps {
    exerciseName: string;
}

const PostureAnalyzer: React.FC<PostureAnalyzerProps> = ({ exerciseName }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsCameraOn(true);
        setFeedback(''); // Clear previous feedback
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setFeedback('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
  };
  
  useEffect(() => {
    // Cleanup on unmount
    return () => {
        if(isCameraOn) {
            stopCamera();
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraOn]);


  const handleAnalyze = async () => {
    setIsLoading(true);
    // In a real app, we would capture a frame here and send it.
    // e.g., const frame = captureFrame();
    // For this simulation, we just use the exercise name.
    const postureFeedback = await analyzePosture(exerciseName);
    setFeedback(postureFeedback);
    setIsLoading(false);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-secondary mb-2">Real-time Form Check</h3>
        <p className="text-sm text-text-secondary mb-4">Get instant feedback on your form for: <span className="font-bold">{exerciseName}</span></p>
        <div className="aspect-video bg-bg-tertiary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {isCameraOn ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-text-secondary">
              <i className="fas fa-video-slash text-4xl mb-2"></i>
              <p>Camera is off</p>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mb-4">
            {!isCameraOn ? (
                 <Button onClick={startCamera} className="w-full">
                    <i className="fas fa-camera mr-2"></i> Start Camera
                </Button>
            ) : (
                 <Button onClick={stopCamera} variant="secondary" className="w-full">
                    <i className="fas fa-stop-circle mr-2"></i> Stop Camera
                </Button>
            )}
        </div>

        <Button onClick={handleAnalyze} disabled={isLoading || !isCameraOn} className="w-full">
          {isLoading ? <Spinner size="sm"/> : <><i className="fas fa-robot mr-2"></i> Analyze My Form</>}
        </Button>
        
        {feedback && (
          <div className="mt-4 p-3 bg-brand-dark rounded-lg text-sm text-center">
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostureAnalyzer;
