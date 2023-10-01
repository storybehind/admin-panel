import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ReloadPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State to track whether the user has canceled the reloading
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    // Function to simulate a long-running task (e.g., fetching data)
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Check if the user canceled the reloading process
        if (!canceled) {
          router.reload();
        }
      } catch (error) {
        console.error('An error occurred', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean up: Cancel the reloading process when the component unmounts
    return () => {
      setCanceled(true);
    };
  }, [canceled, router]);

  const handleCancel = () => {
    // Set canceled to true to stop the reloading process
    setCanceled(true);
  };

  return (
    <div>
      <h2>Reload Page</h2>
      <button onClick={handleCancel} disabled={!loading}>
        Cancel Reloading
      </button>
      <div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          'Reload complete!'
        )}
      </div>
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ReloadPage;
