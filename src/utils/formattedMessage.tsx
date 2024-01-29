export const formattedMessage = (
  message: string | null,
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
