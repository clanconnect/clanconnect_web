'use client';
/**
 * react-helmet(-async) compatibility shim.
 * SEO tags are now emitted server-side via the App Router `metadata` exports
 * in the app router pages, so the client-side Helmet becomes a no-op.
 */
export const Helmet = () => null;
export const HelmetProvider = ({ children }) => children;
export default Helmet;
