// 1. 모든 버튼 요소를 선택합니다.
const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

// 2. 각 버튼에 클릭 이벤트 리스너를 추가합니다.
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const clickedValue = event.target.value;

        // 3. 클래스가 "number"인 버튼에 대해서만 처리합니다.
        if (button.classList.contains("number")) {
            // 숫자 또는 소수점인 경우 디스플레이에 값을 표시합니다.
            if (!isNaN(clickedValue) || clickedValue === '.') {
                // 소수점이 이미 있는지 확인
                if (clickedValue === '.' && display.textContent.includes('.')) {
                    return; // 이미 소수점이 있으면 아무것도 하지 않음
                }

                if (display.textContent === '0') {
                // 4. 디스플레이가 '0'일 때는 클릭한 숫자 또는 소수점으로 바뀌어야 합니다.
                    display.textContent = clickedValue;
                } else {
                // 5. 디스플레이가 '0'이 아닐 때는 클릭한 숫자 또는 소수점이 뒤에 추가되어야 합니다.
                    display.textContent += clickedValue;
                }

                // 클릭한 숫자를 콘솔에 출력
                if (!isNaN(clickedValue)) {
                    console.log(`${clickedValue}`);
                }
            }
        } else {
            // 6. 클래스가 "number"가 아닌 버튼 클릭 시 콘솔에 출력합니다.
            console.log(`${clickedValue}`);
        }
    });
});