// src/components/HisaabCard.jsx
import { useState } from 'react';

const HisaabCard = ({ h }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const updatedAt = new Date(h.updatedAt);
  const createdAt = new Date(h.createdAt);

  const handleUnlock = () => {
    if (passcode === h.passcode) {
      setUnlocked(true);
      setShowSpinner(true);
      setTimeout(() => {
        setUnlocked(false);
        setShowSpinner(false);
        setPasscode('');
      }, 5000);
    } else {
      setError("Doesn't match! Try again.");
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="hisaabCard text-center w-min p-3">
      <div className="p-5 h-70 w-60 shadow-md shadow-gray-600 rounded-xl bg-white border border-gray-100">
        <div className="h-50 text-left text-gray-600 text-md mb-4 flex flex-col rounded-xl inset-shadow-sm/40">
          <div className="hisaabData p-3 flex flex-col">
            {h.encrypt && !unlocked ? (
              <>
                <h3 className="text-center w-full font-semibold">Encrypted</h3>
                <button className="m-2 flex flex-col justify-center items-center" onClick={() => document.querySelector('.passcode')?.focus()}>
                  <img className="h-5 ml-2 opacity-60" src="/images/locked.svg" alt="lock" />
                  <h1 className="cursor-default text-xl text-gray-400">Enter passcode to unlock.</h1>
                </button>
                <input
                  type="text"
                  name="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="passcode px-3 py-1 bg-gray-100 text-gray-500 rounded-xl w-30 m-2 outline-0 ring-0 ring-indigo-400 focus:ring-2 border border-gray-300 inset-shadow-xs"
                  placeholder="passcode"
                />
                <button onClick={handleUnlock} className="bg-green-500 rounded-xl shadow-sm shadow-gray-700 hover:shadow-md active:scale-95">
                  <img className="h-7 invert p-1" src="/images/key.svg" alt="key" />
                </button>
                {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
              </>
            ) : (
              <>
                {h.encrypt ? (
                  unlocked ? (
                    <>
                      <span className="flex items-center gap-1">
                        <h3 className="font-semibold">Amount:</h3>
                        <h3>₹{h.amount}</h3>
                      </span>
                      <div className="max-h-18 overflow-hidden font-semibold">
                        Description: <span className="font-normal">{h.description}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <h3 className="font-semibold">Updated:</h3>
                        <h3>{`${updatedAt.getDate()}-${updatedAt.getMonth() + 1}-${updatedAt.getFullYear()}`}</h3>
                      </span>
                      <span className="flex items-center gap-1">
                        <h3 className="font-semibold">Created At:</h3>
                        <h3>{`${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`}</h3>
                      </span>
                      {showSpinner && (
                        <div style={{ width: '30px', height: '30px', margin: '15px', border: '8px solid #f3f3f3', borderTop: '8px solid #e3342f', borderRadius: '50%', animation: 'spin 5s ease-in infinite' }} />
                      )}
                    </>
                  ) : (
                    <h3 className="text-center">Encrypted</h3>
                  )
                ) : (
                  <>
                    <span className="flex items-center gap-1">
                      <h3 className="font-semibold">Amount:</h3>
                      <h3>₹{h.amount}</h3>
                    </span>
                    <div className="max-h-18 overflow-hidden font-semibold">
                      Description: <span className="font-normal">{h.description}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <h3 className="font-semibold">Updated:</h3>
                      <h3>{`${updatedAt.getDate()}-${updatedAt.getMonth() + 1}-${updatedAt.getFullYear()}`}</h3>
                    </span>
                    <span className="flex items-center gap-1">
                      <h3 className="font-semibold">Created At:</h3>
                      <h3>{`${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`}</h3>
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {h.encrypt && (
            <button className="btn1 px-3 py-1 bg-green-400 font-semibold text-white rounded-md text-sm shadow-md">
              {unlocked ? 'Unlocked' : 'Encrypted'}
            </button>
          )}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this hisaab?')) {
              // Handle delete
            }
          }} className="flex gap-3">
            <button className="px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm shadow-md">
              <img className="h-5 invert" src="/images/edit.png" alt="edit" />
            </button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm shadow-md">
              <img className="h-5 invert" src="/images/delete.png" alt="delete" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HisaabCard;
