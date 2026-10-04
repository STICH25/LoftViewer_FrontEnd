import { Component } from "react";

/** Catches render errors so a crash in one page shows a message instead of a blank screen. */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <button type="button" onClick={() => window.location.reload()}>
            Reload the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
