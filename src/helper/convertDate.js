export function formatDateTime(input) {
    if (!input) return false;

    const date = new Date(input);

    // Kiểm tra input có phải ngày hợp lệ không
    if (isNaN(date.getTime())) return false;

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} ${month}/${year}`;
}