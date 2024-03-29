function formatDate(date) {
    if (date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months start at 0
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    } else return `No date set`
}


export default formatDate