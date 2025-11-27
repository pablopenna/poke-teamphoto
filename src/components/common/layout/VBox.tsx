import { Flexbox } from ".";

export const VBox: React.FC<any> = (props) => {
    return (
        <Flexbox 
            className={(props.className || "") + " vbox"}
        >
            {props.children}
        </Flexbox>
    );
}