import React from 'react'
import { Link } from "react-router-dom";

function ErrorComponent() {
    return <div className="centered white">An Error Occurred. Contact Support or return to <Link to="/welcome">your page</Link></div>
 }
export default ErrorComponent