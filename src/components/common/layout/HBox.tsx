import { Flexbox } from ".";

export const HBox: React.FC<any> = (props) => {
    return (
        <Flexbox 
            className={(props.className || "") + " hbox"}
        >
            {props.children}
        </Flexbox>
    );
}