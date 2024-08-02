import { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { isErrorFromAlias } from '@zodios/core';
import { Button } from '../ui/button.tsx';
import WinningProposal from './WinningProposal.tsx';
import { sdk, type ProposalWinner } from '../../sdk.ts';
import { useClerk } from '../auth/hooks.ts';

export default function SelectWinner() {
  const clerkClient = useClerk();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [start, setStart] = useState(false);
  const [winner, setWinner] = useState<ProposalWinner>();

  const onStartCountdown = () => {
    setStart(true);

    intervalRef.current = setInterval(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);
  };

  const handleGetWinner = useCallback(async () => {
    if (!clerkClient) return;

    try {
      setLoading(true);
      const token = await clerkClient.session?.getToken();

      const result = await sdk.getVoteWinner({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setWinner(result);
      launchConfetti();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      setCountdown(5);
    }
  }, [clerkClient]);

  useEffect(() => {
    if (start && countdown < 1) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setStart(false);
      void handleGetWinner();
    }
  }, [countdown, start, handleGetWinner]);

  return (
    <div>
      {start && (
        <div
          data-testid="winner-countdown"
          className="animate-grow-shrink text-center text-9xl font-bold text-white"
        >
          {countdown}
        </div>
      )}

      {winner && (
        <div
          data-testid="winner-result"
          className="w-full p-3 md:min-w-[375px] md:max-w-[400px] md:p-0 animate-fade-in"
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <WinningProposal {...winner} />
        </div>
      )}

      {!start && !winner && !loading && (
        <Button
          variant="destructive"
          onClick={onStartCountdown}
          size="lg"
          className="text-xl"
        >
          Get Winner
        </Button>
      )}
    </div>
  );
}

function launchConfetti() {
  const _fire = (particleRatio: number, options: confetti.Options) => {
    void confetti({
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
      ...options,
    });
  };

  _fire(0.25, { spread: 26, startVelocity: 55 });
  _fire(0.2, { spread: 60 });
  _fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  _fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  _fire(0.1, { spread: 120, startVelocity: 45 });
}

function handleError(error: unknown) {
  if (isErrorFromAlias(sdk.api, 'getVoteWinner', error)) {
    if (error.response.status === 401) {
      toast.error('You do not have permission to view winners.');
    }

    if (error.response.status === 404) {
      toast.warning(error.response.data.message);
    }
  } else {
    toast.error('Unable to get winner. Please try again.');
  }
}
