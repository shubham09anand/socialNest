import { useEffect, useRef, useState } from "react";

const ScrollVisibilityTracker = () => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = container?.querySelectorAll(".child-div");

    const checkVisibility = () => {
      if (!container || !items) return;

      const containerRect = container.getBoundingClientRect();
      const visibleElements = [];

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();

        if (
          itemRect.top >= containerRect.top &&
          itemRect.bottom <= containerRect.bottom
        ) {
          visibleElements.push(index);
        }
      });

      setVisibleItems(visibleElements);
    };

    container.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Initial check

    return () => container.removeEventListener("scroll", checkVisibility);
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "2px solid black",
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="child-div"
            style={{
              height: "100px",
              background: i % 2 === 0 ? "lightblue" : "lightgray",
              margin: "5px",
            }}
          >
            Item {i}
          </div>
        ))}
      </div>
      <p>Visible Items: {visibleItems.join(", ")}</p>
    </div>
  );
};

export default ScrollVisibilityTracker;
