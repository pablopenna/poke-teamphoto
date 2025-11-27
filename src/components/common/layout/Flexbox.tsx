export const Flexbox: React.FC<any> = (props) => {
  return (
    <div {...props} className={(props.className || '') + ' flexbox'}>
      {props.children}
    </div>
  );
};
