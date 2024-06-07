import { useState } from 'react'
import { data } from './data';
import './styles.css';

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handlesingleSelection = (getCurrentID) => {
        setSelected(getCurrentID === selected ? null : getCurrentID);
    };

    const handleMultipleSelection = (getCurrentID) => {
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentID);

        if(findIndexOfCurrentId === -1) {
            copyMultiple.push(getCurrentID);
        } else {
            copyMultiple.splice(findIndexOfCurrentId, 1);
        }
        setMultiple(copyMultiple);
    };

    return (
        <div className="wrapper">
            <button 
                className={enableMultiSelect ? 'active' : '' }
                onClick={() => setEnableMultiSelect(!enableMultiSelect)}
            >Enable Multi Select</button>
            <div className="accordion">
                {data && data.length > 0 ?
                    data.map((item) => (
                        <div className="item" key={item.id}>
                            <div 
                                onClick={enableMultiSelect ? 
                                    () => handleMultipleSelection(item.id) :
                                    () => handlesingleSelection(item.id)
                                }
                                className="title"
                            >
                                <h3>{item.question}</h3>
                                <span>
                                    {
                                        enableMultiSelect ?
                                        multiple.indexOf(item.id) !== -1 ? '-' : '+' :
                                        selected === item.id ? '-' : '+'
                                    }
                                </span>
                            </div>
                            {
                                enableMultiSelect ?
                                multiple.indexOf(item.id) !== -1 &&
                                <div className="content">{item.answer}</div> :
                                selected === item.id &&
                                <div className="content">{item.answer}</div>
                            }
                        </div>
                    ))
                    : <div>No data found</div>
                }
            </div>
        </div>
    )
}

export default Accordion;