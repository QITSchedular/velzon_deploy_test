function displayAtBeginning(
    content,
    prevclass,
    myclass,
    nextclass,
    paramstr,
    table
) {
    let out = `<div class="gridjs-wrapper" style="height: auto">
    <table role="grid" class="gridjs-table" style="height: auto">
        <thead class="gridjs-thead">
            <tr class="gridjs-tr">`;
    console.log(Object.keys(content[0]));
    for (let i = 0; i < Object.keys(content[0]).length; i++) {
        out += `<th data-column-id="${Object.keys(content[0])[i]}" class="gridjs-th" style="min-width: 77px; width: 77px">
                    <div class="gridjs-th-content">${Object.keys(content[0])[i]}</div>
                </th>`;
    }
    `</tr></thead><tbody class="gridjs-tbody">`;
    for (let j = 0; j < content.length; j++) {
        out += `<tr class="gridjs-tr">`;
        for (let k = 0; k < Object.keys(content[j]).length; k++) {
            out += `<td data-column-id="${Object.values(content[j])[k]}" class="gridjs-td">
                        ${Object.values(content[j])[k]}
                    </td>`;
        }
        out += `</tr>`;
    }
    out += `</tbody>
                    </table>
                  </div>
                  <div class="gridjs-footer">
                    <div class="gridjs-pagination">
                      <div class="gridjs-pages">`;
    $.ajax({
        url: "/getBtn",
        method: "post",
        data: {
            table: table,
            pgno: 1,
            limit: localStorage.getItem("limit"),
            paramstr: paramstr,
        },
        success: (data) => {
            console.log(data);
            let btns = `<button
                          tabindex="0"
                          role="button"
                          disabled=""
                          title="Previous"
                          aria-label="Previous"
                          class=""
                        >
                          Previous</button
                        >`;
            totalBtn = data.totalBtn;
            for (let i = 0; i < totalBtn; i++) {
                if (i == 0) {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="gridjs-currentPage ${myclass}"
                          title="Page ${i + 1}"
                          data-id="${i + 1}"
                          aria-label="Page ${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                } else {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="${myclass}"
                          title="Page ${i + 1}"
                          aria-label="Page ${i + 1}"
                          data-id="${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                }
            }
            if (totalBtn == 1) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                          disabled=""
                        >
                          Next
                        </button>`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"

                        >
                          Next
                        </button>`;
            }
            btns += `</div>
                    </div>
                  </div>
                  <div id="gridjs-temp" class="gridjs-temp"></div>`;
            $("#mycomplementry").html(out + btns);
            $("#chklimit").val(localStorage.getItem("limit"));
        },
    });
}

function nextBtnDisplay(
    content,
    prevclass,
    myclass,
    nextclass,
    pn,
    paramstr,
    table
) {
    let out = `
                  <div class="gridjs-wrapper" style="height: auto">
                    <table
                      role="grid"
                      class="gridjs-table"
                      style="height: auto"
                    >
                      <thead class="gridjs-thead">
                        <tr class="gridjs-tr">`;
    console.log(Object.keys(content[0]));
    for (let i = 0; i < Object.keys(content[0]).length; i++) {
        out += `<th
                            data-column-id="${Object.keys(content[0])[i]}"
                            class="gridjs-th"
                            style="min-width: 77px; width: 77px"
                          >
                            <div class="gridjs-th-content">${Object.keys(content[0])[i]
            }</div>
                          </th>`;
    }
    `</tr>
                      </thead>
                      <tbody class="gridjs-tbody">`;
    for (let j = 0; j < content.length; j++) {
        out += `<tr class="gridjs-tr">`;
        for (let k = 0; k < Object.keys(content[j]).length; k++) {
            out += `<td data-column-id="${Object.values(content[j])[k]
                }" class="gridjs-td">${Object.values(content[j])[k]}</td>`;
        }

        out += `</tr>`;
    }
    out += `</tbody>
                    </table>
                  </div>
                  <div class="gridjs-footer">
                    <div class="gridjs-pagination">
                      <div class="gridjs-pages">`;
    $.ajax({
        url: "/getBtn",
        method: "post",
        data: {
            table: table,
            pgno: pn + 1,
            limit: localStorage.getItem("limit"),
            paramstr: paramstr,
        },
        success: (data) => {
            console.log(data);
            let btns = "";
            if (pn + 1 == 1) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          disabled=""
                          title="Previous"
                          aria-label="Previous"
                          class="${prevclass}"
                        >
                          Previous</button
                        >`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Previous"
                          aria-label="Previous"
                          class="${prevclass}"
                        >
                          Previous</button
                        >`;
            }
            totalBtn = data.totalBtn;
            for (let i = 0; i < totalBtn; i++) {
                if (i == pn) {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="gridjs-currentPage ${myclass}"
                          title="Page ${i + 1}"
                          data-id="${i + 1}"
                          aria-label="Page ${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                } else {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="${myclass} ${nextclass}"
                          title="Page ${i + 1}"
                          aria-label="Page ${i + 1}"
                          data-id="${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                }
            }
            if (pn + 1 == Math.ceil(totalBtn)) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                          disabled=""
                        >
                          Next
                        </button>`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                        >
                          Next
                        </button>`;
            }
            btns += `</div>
                    </div>
                  </div>
                  <div id="gridjs-temp" class="gridjs-temp"></div>`;
            $("#mycomplementry").html(out + btns);
            $("#chklimit").val(localStorage.getItem("limit"));
        },
    });
}

function previousBtnDisplay(
    content,
    prevclass,
    myclass,
    nextclass,
    pn,
    paramstr,
    table
) {
    let out = `
                  <div class="gridjs-wrapper" style="height: auto">
                    <table
                      role="grid"
                      class="gridjs-table"
                      style="height: auto"
                    >
                      <thead class="gridjs-thead">
                        <tr class="gridjs-tr">`;
    console.log(Object.keys(content[0]));
    for (let i = 0; i < Object.keys(content[0]).length; i++) {
        out += `<th
                            data-column-id="${Object.keys(content[0])[i]}"
                            class="gridjs-th"
                            style="min-width: 77px; width: 77px"
                          >
                            <div class="gridjs-th-content">${Object.keys(content[0])[i]
            }</div>
                          </th>`;
    }
    `</tr>
                      </thead>
                      <tbody class="gridjs-tbody">`;
    for (let j = 0; j < content.length; j++) {
        out += `<tr class="gridjs-tr">`;
        for (let k = 0; k < Object.keys(content[j]).length; k++) {
            out += `<td data-column-id="${Object.values(content[j])[k]
                }" class="gridjs-td">${Object.values(content[j])[k]}</td>`;
        }

        out += `</tr>`;
    }
    out += `</tbody>
                    </table>
                  </div>
                  <div class="gridjs-footer">
                    <div class="gridjs-pagination">
                      <div class="gridjs-pages">`;
    $.ajax({
        url: "/getBtn",
        method: "post",
        data: {
            table: table,
            pgno: pn - 1,
            limit: localStorage.getItem("limit"),
            paramstr: paramstr,
        },
        success: (data) => {
            console.log(data);
            let btns = "";
            if (pn - 1 == 1) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          disabled=""
                          title="Previous"
                          aria-label="Previous"
                          class="${prevclass}"
                        >
                          Previous</button
                        >`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Previous"
                          aria-label="Previous"
                          class="${prevclass}"
                        >
                          Previous</button
                        >`;
            }
            totalBtn = data.totalBtn;
            for (let i = 0; i < totalBtn; i++) {
                if (i + 1 == pn - 1) {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="gridjs-currentPage ${myclass}"
                          title="Page ${i + 1}"
                          data-id="${i + 1}"
                          aria-label="Page ${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                } else {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="${myclass} ${nextclass}"
                          title="Page ${i + 1}"
                          aria-label="Page ${i + 1}"
                          data-id="${i + 1}"
                        >
                          ${i + 1}</button
                        >`;
                }
            }
            if (pn - 1 == Math.ceil(totalBtn)) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                          disabled=""
                        >
                          Next
                        </button>`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                        >
                          Next
                        </button>`;
            }
            btns += `</div>
                    </div>
                  </div>
                  <div id="gridjs-temp" class="gridjs-temp"></div>`;
            $("#mycomplementry").html(out + btns);
            $("#chklimit").val(localStorage.getItem("limit"));
        },
    });
}

function myBtnDisplay(content, prevclass, myclass, nextclass, index, btnno, pgno, paramstr, table) {
    let out = `<div class="gridjs-wrapper" style="height: auto">
    <table role="grid" class="gridjs-table" style="height: auto">
        <thead class="gridjs-thead">
            <tr class="gridjs-tr">`;
    console.log(Object.keys(content[0]));
    for (let i = 0; i < Object.keys(content[0]).length; i++) {
        out += `<th data-column-id="${Object.keys(content[0])[i]}" class="gridjs-th" style="min-width: 77px; width: 77px">
                    <div class="gridjs-th-content">
                        ${Object.keys(content[0])[i]}
                    </div>
                </th>`;
    }
    `</tr></thead><tbody class="gridjs-tbody">`;
    for (let j = 0; j < content.length; j++) {
        out += `<tr class="gridjs-tr">`;
        for (let k = 0; k < Object.keys(content[j]).length; k++) {
            out += `<td data-column-id="${Object.values(content[j])[k]
                }" class="gridjs-td">${Object.values(content[j])[k]}</td>`;
        }

        out += `</tr>`;
    }
    out += `</tbody>
                    </table>
                  </div>
                  <div class="gridjs-footer">
                    <div class="gridjs-pagination">
                      <div class="gridjs-pages">`;
    $.ajax({
        url: "/getBtn",
        method: "post",
        data: {
            table: table,
            pgno: pgno,
            limit: localStorage.getItem("limit"),
            paramstr: paramstr,
        },
        success: (data) => {
            console.log(data);
            let btns = "";
            if (btnno == 1) {
                btns += `
                <button tabindex="0" role="button" disabled="" title="Previous" aria-label="Previous" class="${prevclass}">
                    Previous
                </button>`;
            } else {
                btns += `<button tabindex="0" role="button" title="Previous" aria-label="Previous" class="${prevclass}">
                    Previous
                </button>`;
            }

            totalBtn = data.totalBtn;
            for (let i = 1; i <= totalBtn; i++) {
                if (i == index) {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="${myclass}"
                          title="Page ${i}"
                          data-id="${i}"
                          aria-label="Page ${i}"
                        >
                          ${i}</button
                        >`;
                } else if (btnno == i) {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="gridjs-currentPage ${myclass}"
                          title="Page ${i}"
                          data-id="${i}"
                          aria-label="Page ${i}"
                        >
                          ${i}</button
                        >`;
                } else {
                    btns += `<button
                          tabindex="0"
                          role="button"
                          class="${myclass}"
                          title="Page ${i}"
                          aria-label="Page ${i}"
                          data-id="${i}"
                        >
                          ${i}</button
                        >`;
                }
            }
            if (btnno == Math.ceil(totalBtn)) {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                          disabled=""
                        >
                          Next
                        </button>`;
            } else {
                btns += `<button
                          tabindex="0"
                          role="button"
                          title="Next"
                          aria-label="Next"
                          class="${nextclass}"
                        >
                          Next
                        </button>`;
            }

            btns += `</div></div></div><div id="gridjs-temp" class="gridjs-temp"></div>`;
            $("#mycomplementry").html(out + btns);
            $("#chklimit").val(localStorage.getItem("limit"));
        },
    });
}
