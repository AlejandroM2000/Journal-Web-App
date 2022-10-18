let journalWrapper = document.querySelector(".container");
export function renderPage() {
    const notebookArea = `        
    <section class="content" id="left">
        <header>
            <textarea name="date" class="date" id="date" cols="10" rows="1" placeholder="Enter the date"></textarea>
        </header>
        <div class="content"></div>
            <textarea name="journal-content" class="journal-content" id="left-page" cols="30" rows="10" placeholder="Enter your daily entry"></textarea>
        </div>
    </section>

    <section class="content" id="right">
        <header>
            <textarea name="date" class="date" id="date" cols="30" rows="1" placeholder="Enter the date"></textarea>
        </header>
        <div class="content"></div>
            <textarea name="journal-content"  class="journal-content" id="right-page" cols="30" rows="10" placeholder="Enter your daily entry"></textarea>
        </div>
    </section>`;
    
}