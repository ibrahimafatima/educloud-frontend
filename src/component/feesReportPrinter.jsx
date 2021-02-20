import React, {useRef, useEffect} from "react"
import ReactToPrint from "react-to-print";
import PrintFeesReport from './printFeesReport';


const FeeReportPrinter = () => {
    const componentRef = useRef();

    useEffect (() => {
        return () => localStorage.removeItem("class_report");
    });

    return <div>
        <ReactToPrint trigger = { () => (
        <div className="mb5">
          <button className="btn btn-primary">
            print Report
          </button>
        </div>
        ) }
        content={() => componentRef.current}
         />
         <br/>
         <hr/>
         <PrintFeesReport ref = {componentRef} />
    </div>
}
 
export default FeeReportPrinter;