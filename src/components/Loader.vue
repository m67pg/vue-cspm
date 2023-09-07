<template>
    <div class="loader">
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

.loader {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.loader div {
    width: 20px;
    height: 20px;
    float: left;
    display: flex;
    justify-content: center;
    align-content:  center;
    align-items: center;
    position: relative;
}

span {
    position: absolute;
    display: block;
    border-radius: 3px;
    animation: anim 1.2s infinite;
    animation-timing-function: linear;
}

@keyframes anim {
    0% { width:0px; height:0px; background: #18FFFF }
    40% { width:15px; height:15px; background: #D500F9 }
    80% { width:0px; height:0px; background: #18FFFF }
}

.loader div:nth-child(2) span,
.loader div:nth-child(4) span {
    animation-delay: 0.15s;
}

.loader div:nth-child(3) span,
.loader div:nth-child(5) span,
.loader div:nth-child(7) span {
    animation-delay: 0.30s;
}

.loader div:nth-child(6) span,
.loader div:nth-child(8) span {
    animation-delay: 0.45s;
}

.loader div:nth-child(9) span {
    animation-delay: 0.60s;
}
</style>
