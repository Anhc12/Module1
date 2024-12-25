'use strict';

class WordGame {
    constructor() {
        this.wordList = [
            { anwser: 'nhỏ giọt', hint: 'Ví cách cung cấp nay một ít, mai một ít và quá chậm' },
            { anwser: 'sao chổi', hint: 'Một hiện tượng thiên nhiên, mọi người thường ước khi nhìn thấy!' },
            { anwser: 'tinh dầu', hint: 'Có mùi thơm, thường dùng để xông hơi!' },
            { anwser: 'mất lòng', hint: 'Có điều không bằng lòng, không hài lòng vì một hành vi, thái độ không phải nào đó' },
            { anwser: 'thiện cảm', hint: 'Tình cảm tốt, ưa thích đối với ai đó.' },
            { anwser: 'đoan trang', hint: 'Chỉ người phụ nữ đứng đắn và nghiêm trang' },
            { anwser: 'phất trần', hint: 'Vật dụng gắn liền với nhân vật "ông Bụt"!' },
            { anwser: 'công tử', hint: 'Con trai nhà quan, nhà quyền quý thời phong kiến!' },
            { anwser: 'chăm chút', hint: 'Chú ý đến từng li từng tí, để cho lúc nào cũng ở trong tình trạng tốt nhất.' },
            { anwser: 'trống vắng', hint: 'Vì thiếu mất đi cái thường phải có, gây cảm giác buồn và trống trải.' }
        ];
        this.currentWord = null; // Từ khóa hiện tại
        this.scrambledWord = ''; // Từ xáo trộn hiện tại
        this.timer = null; // Biến hẹn giờ
        this.timeLeft = 30; // Thời gian đếm ngược
        this.correctAnswer = 0; // Số câu trả lời đúng
        this.score = 0; // Điểm số
        this.hintUsed = false; // Cờ kiểm tra có sử dụng gợi ý không

        // Nhạc nền
        this.backgroundMusic = new Audio('vuatiengviet.m4a');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;

        // Gắn sự kiện
        this.initEvents();
        this.disableInputs();
    }

    // Getter để lấy danh sách từ khóa
    get wordListData() {
        return this.wordList;
    }

    // Getter để lấy từ khóa hiện tại
    get currentWordData() {
        return this.currentWord;
    }

    // Getter để lấy từ xáo trộn
    get scrambledWordData() {
        return this.scrambledWord;
    }

    // Getter để lấy điểm số hiện tại
    get currentScore() {
        return this.score;
    }

    // Getter để lấy số câu trả lời đúng
    get correctAnswersCount() {
        return this.correctAnswer;
    }

    // Bật nhạc nền
    playMusic() {
        this.backgroundMusic.play();
    }

    // Tắt nhạc nền
    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    // Xáo trộn từ khóa
    shuffleWord(word) {
        let shuffled = word.split('');
        do {
            shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
        } while (shuffled === word); // Đảm bảo từ xáo trộn khác đáp án
        return shuffled;
    }

    // Sinh từ mới
    generateNewWord() {
        let newWord;
        do {
            newWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        } while (newWord === this.currentWord); // Tránh lặp lại từ cũ

        this.currentWord = newWord;
        this.scrambledWord = this.shuffleWord(newWord.anwser);

        document.querySelector('.scrambled-word').textContent = this.scrambledWord;
        document.querySelector('.message').textContent = 'Bắt đầu đoán!';
        document.querySelector('.guess-input').value = '';
        document.querySelector('.container').style.backgroundColor = '#fff';

        this.startTimer();
    }

    // Bắt đầu đếm thời gian
    startTimer() {
        this.timeLeft = 30;
        document.querySelector('.timer').textContent = `Thời gian: ${this.timeLeft}s`;
        this.playMusic();

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.querySelector('.timer').textContent = `Thời gian: ${this.timeLeft}s`;

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                document.querySelector('.message').textContent = '⏰ Hết giờ!';
                this.disableInputs();
                this.stopMusic();
            }
        }, 1000);
    }

    // Khóa input và nút check
    disableInputs() {
        document.querySelector('.guess-input').disabled = true;
        document.querySelector('.check-button').disabled = true;
    }

    // Mở input và nút check
    enableInputs() {
        document.querySelector('.guess-input').disabled = false;
        document.querySelector('.check-button').disabled = false;
    }

    // Bắt đầu game
    startGame() {
        this.generateNewWord();
        this.enableInputs();
        document.querySelector('.start-button').disabled = true;
    }

    // Đặt lại game
    resetGame() {
        this.score = 0;
        this.correctAnswer = 0;
        document.querySelector('.score').textContent = `Điểm: ${this.score}`;
        document.querySelector('.correct-answer').textContent = `Câu đúng: ${this.correctAnswer}`;
        this.startGame();
    }

    // Kiểm tra đáp án
    checkGuess() {
        const guess = document.querySelector('.guess-input').value.trim().toLowerCase();
        if (!guess) {
            document.querySelector('.message').textContent = '⛔ Nhập câu trả lời!';
            return;
        }

        if (guess === this.currentWord.anwser) {
            this.correctAnswer++;
            this.score += this.hintUsed ? 5 : 10;
            document.querySelector('.score').textContent = `Điểm: ${this.score}`;
            document.querySelector('.correct-answer').textContent = `Câu đúng: ${this.correctAnswer}`;

            Swal.fire('🎉 Đúng rồi!', '', 'success');
            this.generateNewWord();
        } else {
            document.querySelector('.message').textContent = '❌ Sai rồi!';
        }
    }

    // Hiển thị gợi ý
    showHint() {
        this.hintUsed = true;
        Swal.fire({
            title: 'Gợi ý',
            text: this.currentWord.hint,
            imageUrl: './bongden.png',
            imageWidth: 80,
            imageHeight: 90,
            imageAlt: 'Hint'
        });
    }

    // Thêm câu hỏi mới
    addQuestion() {
        Swal.fire({
            title: 'Thêm câu hỏi mới',
            html: `
                <input type="text" id="newWord" class="swal2-input" placeholder="Nhập từ khóa">
                <input type="text" id="newHint" class="swal2-input" placeholder="Nhập gợi ý">
            `,
            showCancelButton: true,
            confirmButtonText: 'Thêm',
            cancelButtonText: 'Hủy',
            preConfirm: () => {
                const newWord = document.getElementById('newWord').value.trim();
                const newHint = document.getElementById('newHint').value.trim();

                if (!newWord || !newHint) {
                    Swal.showValidationMessage('Vui lòng nhập cả từ khóa và gợi ý');
                    return false;
                }
                return { anwser: newWord, hint: newHint };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newQuestion = result.value;
                const isDuplicate = this.wordList.some(word => word.anwser.toLowerCase() === newQuestion.anwser.toLowerCase());

                if (isDuplicate) {
                    Swal.fire('Lỗi', 'Từ khóa đã tồn tại!', 'error');
                } else {
                    this.wordList.push(newQuestion);
                    Swal.fire('Thành công', 'Câu hỏi mới đã được thêm!', 'success');
                }
            }
        });
    }

    // Gắn sự kiện
    initEvents() {
        document.querySelector('.start-button').addEventListener('click', () => this.startGame());
        document.querySelector('.reset-button').addEventListener('click', () => this.resetGame());
        document.querySelector('.check-button').addEventListener('click', () => this.checkGuess());
        document.querySelector('.add-question-button').addEventListener('click', () => this.addQuestion());
        document.querySelector('.guess-input').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') this.checkGuess();
        });
    }
}

// Khởi tạo game
document.addEventListener('DOMContentLoaded', () => {
    new WordGame();
});
