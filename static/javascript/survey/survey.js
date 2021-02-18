document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('info').style.display = 'none';
    document.getElementById('got-more').addEventListener('change', function () {
        let textarea = document.getElementById('info');
        if (textarea.style.display === 'none') {
            textarea.style.display = "block";
        } else {
            textarea.style.display = "none";
        }
    })
});