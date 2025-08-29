import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // ✅ run on pathname change
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    useEffect(() => {
        // ✅ run once on first mount (refresh)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return null;
};

export default ScrollToTop;
