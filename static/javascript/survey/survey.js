document.addEventListener('DOMContentLoaded', function () {
    console.log("yes!")
    document.getElementById('got-more').addEventListener('change', function () {
        let disabled = document.getElementById('info').disabled;
        document.getElementById('info').disabled = !disabled;
    })
});