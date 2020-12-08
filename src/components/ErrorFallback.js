function ErrorFallback({ error }) {
  return (
    <div>
      <p>
        In case of application crash, show this spiffy component as a fallback
        instead of broken screen.
      </p>
      {/* <pre>{error.message}</pre> */}
    </div>
  );
}

export default ErrorFallback