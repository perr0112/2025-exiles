import React, { useState, useEffect, useRef } from "react";

const NOTIFICATIONS = [
  {
    id: 1,
    sender: "Li Wei",
    text: "J'ai trouvé un contact pour la traversée.",
    app: "WeChat",
    time: "5m",
  },
  {
    id: 2,
    sender: "Maman",
    text: "Es-tu arrivé en sécurité ? Réponds-moi vite.",
    app: "Messages",
    time: "Maintenant",
  },
  {
    id: 3,
    sender: "Ahmed",
    text: "📍 Point de rendez-vous : 36.2048° N, 37.1343° E",
    app: "WhatsApp",
    time: "12m",
  },
  {
    id: 4,
    sender: "Karim",
    text: "Ils contrôlent les téléphones. Efface tout.",
    app: "Snapchat",
    time: "18m",
  },
  {
    id: 5,
    sender: "Groupe Solidarité",
    text: "Distribution d'eau et couvertures ce soir à 20h.",
    app: "Facebook",
    time: "35m",
  },
  {
    id: 6,
    sender: "Papa",
    text: "On pense à toi chaque jour. Prends soin de toi.",
    app: "Messages",
    time: "1h",
  },
];

const NotificationStream: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress
      const scrollDistance = -top;
      const availableScroll = height - windowHeight;

      if (availableScroll <= 0) return;

      let progress = scrollDistance / availableScroll;

      // Clamp progress
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // Calculation adjusted to trigger the first notification earlier
      // progress * 7 + 0.5 ensures that around 7-8% scroll, we hit index 1.
      // 800vh height gives enough resistance for "1 click = 1 notif" feeling without being too long.
      const count = Math.floor(progress * (NOTIFICATIONS.length + 1.5));

      setVisibleCount(Math.min(count, NOTIFICATIONS.length));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAppIcon = (app: string) => {
    switch (app) {
      case "WhatsApp":
        return (
          <div className="w-full h-full bg-[#25D366] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-white fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        );
      case "WeChat":
        return (
          <div className="w-full h-full bg-[#07C160] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white fill-current"
            >
              <path d="M18.2 12.6c0-3-3-5.5-6.7-5.5-3.7 0-6.7 2.5-6.7 5.5 0 1.7 1 3.3 2.5 4.3l-.6 2.1 2.5-1.3c.7.2 1.5.3 2.3.3 3.7 0 6.7-2.5 6.7-5.4zm-7.6-1.7c0-.5.4-.8.8-.8.5 0 .8.4.8.8s-.4.8-.8.8c-.4 0-.8-.4-.8-.8zm4.5 0c0-.5.4-.8.8-.8.5 0 .8.4.8.8s-.4.8-.8.8c-.4 0-.8-.4-.8-.8z" />
              <path d="M23.5 16.7c0-2.4-2.6-4.4-5.8-4.4-.2 0-.5 0-.7 0 .6.9.9 1.9.9 2.9 0 3.4-3.5 6.1-7.8 6.1-.6 0-1.2-.1-1.8-.2.8 1.6 2.8 2.7 5.2 2.7.7 0 1.4-.1 2-.3l2.1 1.1-.5-1.8c1.4-.8 2.4-2.2 2.4-3.7z" />
            </svg>
          </div>
        );
      case "Snapchat":
        return (
          <div className="w-full h-full bg-[#FFFC00] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-black fill-current"
            >
              <path d="M12.005 2.55c-3.634 0-5.318 2.077-5.573 3.403-.123.638.306 1.09.65 1.376.343.287.598.496.395 1.262-.204.765-.93 2.104-1.35 3.227-.42 1.123-.497 1.799.14 2.194.638.395 1.67.23 1.67.23s.192 1.467-.446 1.85c-.638.382-1.773.395-1.773.395s-.242 1.007 1.071 1.39c1.313.382 2.257.153 2.984.076.727-.076 1.084.46 2.232.46 1.148 0 1.505-.536 2.232-.46.727.077 1.67.306 2.984-.076 1.313-.383 1.071-1.39 1.071-1.39s-1.135-.013-1.773-.396c-.638-.382-.446-1.85-.446-1.85s1.033.166 1.67-.23c.638-.395.561-1.07.14-2.193-.42-1.123-1.147-2.462-1.351-3.227-.204-.766.051-.975.395-1.262.344-.286.772-.738.65-1.376-.255-1.326-1.939-3.403-5.572-3.403h-.002z" />
            </svg>
          </div>
        );
      case "Instagram":
        return (
          <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="w-3.5 h-3.5 text-white"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
        );
      case "Facebook":
        return (
          <div className="w-full h-full bg-[#1877F2] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white fill-current"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        );
      case "Messages":
      default:
        return (
          <div className="w-full h-full bg-[#34C759] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-white fill-current"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[800vh] relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Header Text */}
        <div className="text-center mb-16 px-4 z-20">
          <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
            L'angoisse de l'attente
          </h3>
          <h2 className="text-3xl md:text-5xl font-display uppercase text-white drop-shadow-lg">
            Des messages qui changent tout
          </h2>
        </div>

        <div className="relative w-full max-w-[340px] h-[240px] flex justify-center items-center perspective-1000">
          {NOTIFICATIONS.map((notification, index) => {
            const isVisible = index < visibleCount;

            // Stack Position Logic
            // 0 = Front (Newest)
            const stackPosition = visibleCount - 1 - index;

            let yOffset = 0;
            let scale = 1;
            let opacity = 1;
            let blur = 0;
            let zIndex = index;

            if (!isVisible) {
              // Waiting above
              yOffset = -120;
              opacity = 0;
              scale = 1.1;
            } else {
              // Visible in stack
              yOffset = stackPosition * 12;
              scale = 1 - stackPosition * 0.06;
              opacity = stackPosition > 3 ? 0 : 1 - stackPosition * 0.2;
              blur = stackPosition * 3;

              if (stackPosition === 0) {
                yOffset = 0;
                scale = 1;
                opacity = 1;
                blur = 0;
              }
            }

            return (
              <div
                key={notification.id}
                className="absolute w-full transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)"
                style={{
                  zIndex: zIndex,
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                }}
              >
                {/* iOS Style Notification Card */}
                <div
                  className="
                    backdrop-blur-[30px] bg-white/10 
                    border border-white/20 
                    rounded-[18px] p-3 shadow-2xl overflow-hidden
                "
                >
                  <div className="flex flex-col gap-1">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-[5px] overflow-hidden shadow-sm flex-shrink-0">
                          {getAppIcon(notification.app)}
                        </div>
                        <span className="text-[11px] font-medium uppercase text-gray-200 tracking-wide leading-none pt-0.5">
                          {notification.app}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-300 font-normal">
                        {notification.time}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pl-0 pr-1">
                      <h4 className="text-white font-semibold text-[13px] leading-snug mb-0.5">
                        {notification.sender}
                      </h4>
                      <p className="text-white/90 text-[13px] leading-snug font-normal line-clamp-2">
                        {notification.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <div
          className={`absolute bottom-10 transition-opacity duration-500 ${
            visibleCount === 0 ? "opacity-50" : "opacity-0"
          }`}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationStream;
