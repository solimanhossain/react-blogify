export default function formatDate(inputDate) {
    return new Date(inputDate).toLocaleString("en-EU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}
