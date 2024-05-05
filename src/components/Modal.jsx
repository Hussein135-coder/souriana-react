/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import Card from "./Card";
import { useState } from "react";

const Backdrop = ({
  children,
  setIsOpen,
  animateClasses,
  setanimateClasses,
}) => {
  const handleClose = () => {
    setanimateClasses({
      overlay: "animate-scaleOut scale-0 ",
      backdrop: "animate-fadeOut opacity-0",
    });
  };
  return (
    <>
      <div
        onClick={handleClose}
        onAnimationEnd={(e) => {
          e.animationName == "fadeOut" && setIsOpen(false);
        }}
        className={
          animateClasses.backdrop +
          " fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-900/80 z-50"
        }
      >
        {children}
      </div>
    </>
  );
};

const Modal = ({ children, setIsOpen }) => {
  const [animateClasses, setanimateClasses] = useState({
    overlay: "animate-scaleIn",
    backdrop: "animate-fadeIn",
  });

  return (
    <>
      {createPortal(
        <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 z-40">
          <Backdrop
            setIsOpen={setIsOpen}
            animateClasses={animateClasses}
            setanimateClasses={setanimateClasses}
          />

          {/* Overlay */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={
              animateClasses.overlay +
              " max-w-[500px]  sm:right-[250px] w-5/6 z-[500]"
            }
          >
            <Card className={"p-5 w-full"}>{children}</Card>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
