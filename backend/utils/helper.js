exports.formatDate = (date) => {
    return date.toISOString().split('T')[0];
};
