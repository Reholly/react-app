import styled from "styled-components"
import { useSetPriorityById } from "../../data/hooks/useData";



const Input = styled.select`
        width: 50px;
        height: 25px;
        border-radius: 20%;
        background-color: #FFFFFF;`


export const PrioritySelect = ({ id, priority, setPriority, setColor }) => {
    const { mutate } = useSetPriorityById();

    const onChangeHandler = (e) => {
        if (setPriority) {
            setPriority(e.target.value);
        }

        if (setColor) {
            setColor(e.target.value);
        }

        mutate({
            id,
            priority: e.target.value
        });
    };

    return (
    <Input value={priority}
           onChange={onChangeHandler} >
        {[1, 2, 3, 4, 5,
          6, 7, 8, 9, 10, 11].
        map(num =>
        <option
            key={num}
            value={num}>
          {num}
        </option>)}
    </Input>
    );
}