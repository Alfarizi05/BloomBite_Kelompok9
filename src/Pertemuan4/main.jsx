import { createRoot } from "react-dom/client";
import './tailwind.css';
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import Responsive from "./components/Responsive";
import ProductListSearchFilter from "./ProductListSearchFilter";


createRoot (document.getElementById("root"))
    .render(
        <div>
            {/* {<FrameworkList/>} */}
            {/* {<FrameworkListSearchFilter/>} */}
            {<ProductListSearchFilter/>}
            {/* {<Responsive/>} */}
        </div>
    )