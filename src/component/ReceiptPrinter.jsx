import React , {useRef, useEffect} from 'react';
import ReactToPrint from 'react-to-print';
import PrintReceipt from './printReceipt';


const ReceiptPrinter = () => {
    const componentRef = useRef();

    useEffect (() => {
        return () => localStorage.removeItem("receiptID");
    });

    return <div>
        <ReactToPrint trigger = { () => (
        <div className="mb5">
          <button className="btn btn-primary">
            print receipt
          </button>
        </div>
        ) }
        content={() => componentRef.current}
         />
        <br/>
        <hr/>
        <PrintReceipt ref = {componentRef} />
    </div>
}
 

export default ReceiptPrinter;