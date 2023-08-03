import { useEffect } from "react";

useEffect(() => {
    // Perform localStorage action
    localStorage.setItem("name", "MY NAME");
    console.log(localStorage.getItem("name"));
}, []);
