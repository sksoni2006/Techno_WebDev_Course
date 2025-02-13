import React from "react";
import PropTypes from "prop-types";
import "./card.css"; // Ensure you create a corresponding CSS file

const Card = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`card ${className}`} {...props}>
    {children}
  </div>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`card-header ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <h3 ref={ref} className={`card-title ${className}`} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <p ref={ref} className={`card-description ${className}`} {...props}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`card-content ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`card-footer ${className}`} {...props}>
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

Card.propTypes = CardHeader.propTypes = CardFooter.propTypes = CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardTitle.propTypes = CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
