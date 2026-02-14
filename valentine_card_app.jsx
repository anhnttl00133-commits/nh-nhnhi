import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOVE_PASSWORD = "1234"; // 👉 đổi mật khẩu tại đây

export default function ValentineCard() {
  const [page, setPage] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const nextPage = () => setPage((p) => Math.min(p + 1, 3));

  const checkPassword = () => {
    if (input === LOVE_PASSWORD) {
      setPage(1);
      setError(false);
    } else {
      setError(true);
    }
  };

  const pages = [
    <PasswordPage
      key="lock"
      input={input}
      setInput={setInput}
      checkPassword={checkPassword}
      error={error}
    />,
    <PageOne key="p1" nextPage={nextPage} />,
    <PageTwo key="p2" nextPage={nextPage} />,
    <PageThree key="p3" nextPage={() => setPage(1)} />,
  ];

  return (
    <div className="w-full h-screen bg-pink-100 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl h-[90%] bg-white rounded-2xl shadow-xl p-6 relative"
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-4 text-3xl hover:scale-110 transition"
    >
      ❤️
    </button>
  );
}

function PasswordPage({ input, setInput, checkPassword, error }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-7xl"
      >
        💖
      </motion.div>

      <h2 className="text-2xl font-bold">Mật khẩu tình yêu</h2>

      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập mật khẩu..."
        className="border rounded-xl px-4 py-2 text-center"
      />

      <button
        onClick={checkPassword}
        className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
      >
        Mở thiệp
      </button>

      {error && <p className="text-red-500">Sai mật khẩu rồi nè 😝</p>}
    </div>
  );
}

function PageOne({ nextPage }) {
  const startDate = new Date("2024-01-01"); // 👉 sửa ngày yêu tại đây
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="text-8xl"
      >
        ❤️
      </motion.div>

      <div className="text-xl font-semibold">
        Đã yêu nhau: {diffDays} ngày 💕
      </div>

      <div className="grid grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center">
          <img
            src="/your-photo.jpg"
            alt="Bạn"
            className="w-32 h-32 object-cover rounded-full shadow"
          />
          <p className="mt-2 font-medium">Tên bạn</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/her-photo.jpg"
            alt="Cô ấy"
            className="w-32 h-32 object-cover rounded-full shadow"
          />
          <p className="mt-2 font-medium">Tên cô ấy</p>
        </div>
      </div>

      <HeartButton onClick={nextPage} />
    </div>
  );
}

function PageTwo({ nextPage }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-6">
      <h2 className="text-2xl font-bold">Kỷ niệm video của chúng ta 💞</h2>

      <video
        src="/memory-video.mp4" // 👉 thay bằng video của bạn
        controls
        className="max-h-[60%] rounded-xl shadow-lg"
      />

      <HeartButton onClick={nextPage} />
    </div>
  );
}

function PageThree({ nextPage }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-6 px-6">
      <h2 className="text-2xl font-bold">Gửi em ❤️</h2>

      <p className="text-lg leading-relaxed">
        Em là điều tuyệt vời nhất đến với anh. Cảm ơn em vì đã luôn ở
        bên, mang đến niềm vui, tiếng cười và tình yêu. Anh mong chúng ta
        sẽ cùng nhau đi thật lâu, thật xa — và luôn hạnh phúc như hôm nay.
        Yêu em rất nhiều 💖
      </p>

      <HeartButton onClick={nextPage} />
    </div>
  );
}
