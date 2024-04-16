export const formattedMessage = (
  message: string | undefined,
): JSX.Element[] | null => {
  return message
    ? message.split('\n').map((item, key) => (
        <span key={key}>
          {item}
          <br />
        </span>
      ))
    : null;
};
