import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = e.target[0].value;
    setEmail(mail);
    const pass = e.target[1].value;
    console.log(pass, mail);

    if (signUp) {
      createUserWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feed");
          toast.success("hesabınız oluşturuldu");
        })
        .catch((err) => {
          console.log(err);
          toast.error(`üzgünüz bir hata oluştu : ${err.code}`);
        });
    } else {
      signInWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feed");
          toast.success("Hesabınıza giriş yapıldı");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-login-credentials") {
            setIsError(true);
          }
          toast.error(`Giriş Yapılamadı : ${err.code}`);
        });
    }
  };
  const handlePassReset = () => {
    sendPasswordResetEmail(auth, email).then(() =>
      toast.info("Mailinize sıfırlama e-postası gönderildi")
    );
  };

  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      navigate("/feed");
      toast.success("google hesabınız ile giriş yapıldı");
    });
  };
  return (
    <section className="h-screen bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.png" alt="" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>
        <div
          onClick={handleGoogle}
          className="flex bg-white items-center py-2 px-10 rounded-full cursor-pointer gap-3 hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-lll.png" alt="" />
          <span className="text-black">
            Google ile {signUp ? "Kaydol" : "Giriş Yap"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>E-mail</label>
          <input
            className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]"
            type="email"
          />
          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]"
            type="password"
          />
          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className=" mt-5">
            <span className="text-gray-500 me-2">
              {signUp ? "Hesabınız varsa ?" : "Hesabınız yoksa ? "}
            </span>
            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer text-blue-500"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>

          {isError && !signUp && (
            <p
              onClick={handlePassReset}
              className="text-red-400 mt-4 cursor-pointer"
            >
              Şifreni mi unuttun?
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Auth;
