const Accordion = ({ children, isActive, accordion, idx }) => {
  return (
    <li
      className={`accordion ${
        accordion === "secondary" ? "accordion-seondary mb-25px" : ""
      } ${isActive ? "active" : ""}`}
    >
      {accordion === "secondary" ? (
        <div className="bg-whiteColor border border-borderColor dark:bg-whiteColor-dark dark:border-borderColor-dark rounded-t-md">
          {children}
        </div>
      ) : accordion === "secondaryLg" ? (
        <div
        
        >
          {children}
        </div>
      ) : (
        children
      )}
    </li>
  );
};

export default Accordion;
