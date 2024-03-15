import React from "react";

export default function FormField({ children, label, htmlFor, error }) {
    const id = htmlFor || getChieldId(children);
    return (
        <fieldset className="mb-6">
            {label && (
                <label className="block mb-2" htmlFor={id}>
                    {label}
                </label>
            )}
            {children}
            {error && (
                <div role="alert" className="text-red-500">
                    {error}
                </div>
            )}
        </fieldset>
    );
}

function getChieldId(children) {
    const child = React.Children.only(children);
    return child?.props?.id;
}
