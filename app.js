document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "polla_mundial_2026";

    let savedBracketWinners = [];

    // ==========================================================
    // RENDERIZADO DE GRUPOS DESDE data.js
    // ==========================================================
    function crearFilaPartido(partido) {
        const gl = partido.golesLocal ?? 0;
        const gv = partido.golesVisitante ?? 0;
        const confirmado = partido.jugado ? " partido-confirmado" : "";
        return `<div class="match-row${confirmado}">
            <div class="team-name left">${partido.local}</div>
            <div class="score-container">
                <div class="control-counter">
                    <button type="button" class="btn-counter plus" data-type="local">+</button>
                    <span class="score-display" data-type="local">${gl}</span>
                    <button type="button" class="btn-counter minus" data-type="local">-</button>
                </div>
                <span class="separator">-</span>
                <div class="control-counter">
                    <button type="button" class="btn-counter plus" data-type="visitante">+</button>
                    <span class="score-display" data-type="visitante">${gv}</span>
                    <button type="button" class="btn-counter minus" data-type="visitante">-</button>
                </div>
            </div>
            <div class="team-name right">${partido.visitante}</div>
        </div>`;
    }

    function renderizarGrupos() {
        const nav = document.getElementById("group-selector-nav");
        const container = document.getElementById("groups-container");
        if (!nav || !container) return;

        const letras = Object.keys(torneoData.grupos).sort();

        nav.innerHTML = letras.map((letra, i) =>
            `<button class="selector-btn${i === 0 ? " active" : ""}" data-group="${letra}">${letra}</button>`
        ).join("");

        container.innerHTML = letras.map((letra, i) => {
            const grupo = torneoData.grupos[letra];
            const partidosHtml = grupo.partidos.map(crearFilaPartido).join("");
            return `<div class="group-card${i === 0 ? " active" : ""}" id="card-grupo-${letra}">
                <h3>GRUPO ${letra}</h3>
                <div class="standings-container">
                    <table class="standings-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Equipo</th><th>PJ</th><th>GF</th><th>GC</th><th>DIF</th><th>PTS</th>
                            </tr>
                        </thead>
                        <tbody id="standings-${letra}"></tbody>
                    </table>
                </div>
                <h4 class="matches-heading">Partidos</h4>
                <div class="matches-container">${partidosHtml}</div>
            </div>`;
        }).join("");
    }

    // ==========================================================
    // RENDERIZADO DE LLAVES DESDE data.js
    // ==========================================================
    function slotId(rondaId, partidoId, posicion) {
        if (partidoId) return `slot-${rondaId}-${partidoId}-${posicion}`;
        return `slot-${rondaId}-${posicion}`;
    }

    function crearEquipoBracket(rondaId, partidoId, posicion, etiqueta) {
        const id = slotId(rondaId, partidoId, posicion);
        return `<div class="bracket-team ${posicion} team-row-clickable" id="${id}">
            <span class="team-name-bracket">${etiqueta}</span>
        </div>`;
    }

    function crearPartidoBracket(rondaId, partido) {
        const top = crearEquipoBracket(rondaId, partido.id, "top", partido.top);
        const bottom = crearEquipoBracket(rondaId, partido.id, "bottom", partido.bottom);
        return `<div class="match-bracket">${top}${bottom}</div>`;
    }

    function buildBracketProgression(progresion) {
        const result = {};
        progresion.forEach(p => {
            if (!result[p.ronda]) result[p.ronda] = [];
            const targetId = slotId(p.ronda, p.targetMatch, p.targetPos);
            const entry = { source: { stage: p.sourceRonda, match: p.sourceMatch } };
            if (p.targetPos === "top") entry.targetTop = targetId;
            else entry.targetBottom = targetId;
            result[p.ronda].push(entry);
        });
        return result;
    }

    function renderizarLlaves() {
        const nav = document.getElementById("ronda-selector-nav");
        const container = document.getElementById("bracket-container");
        if (!nav || !container || !torneoData.llaves) return;

        const { rondas } = torneoData.llaves;

        nav.innerHTML = rondas.map((ronda, i) =>
            `<button class="ronda-btn${i === 0 ? " active" : ""}" data-ronda="${ronda.id}">${ronda.etiquetaBoton}</button>`
        ).join("");

        container.innerHTML = rondas.map((ronda, i) => {
            const partidosHtml = ronda.partidos.map(p => crearPartidoBracket(ronda.id, p)).join("");
            return `<div class="bracket-column${i === 0 ? " active" : ""}" id="ronda-${ronda.id}">
                <div class="column-header">${ronda.titulo}</div>
                ${partidosHtml}
            </div>`;
        }).join("");
    }

    const bracketSlotConfig = torneoData.llaves.clasificacion;
    const bracketProgression = buildBracketProgression(torneoData.llaves.progresion);

    // ==========================================================
    // PERSISTENCIA
    // ==========================================================
    function getBracketWinners() {
        return [...document.querySelectorAll(".bracket-team.winner")].map(el => el.id);
    }

    function guardarMarcadoresEnLocalStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                grupos: torneoData.grupos,
                bracketWinners: getBracketWinners()
            }));
        } catch (error) {
            console.error("Error guardando datos en localStorage:", error);
        }
    }

    function restoreBracketWinners(winnerIds) {
        document.querySelectorAll(".bracket-team.winner").forEach(el => el.classList.remove("winner"));
        if (!winnerIds?.length) return;

        winnerIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const teamName = el.querySelector(".team-name-bracket")?.textContent.trim();
            if (!teamName || isBracketPlaceholder(teamName)) return;
            el.classList.add("winner");
        });
    }

    function sincronizarMarcadoresUI() {
        document.querySelectorAll(".match-row").forEach(filaPartido => {
            const equipoLocal = filaPartido.querySelector(".team-name.left").textContent.trim();
            const equipoVisitante = filaPartido.querySelector(".team-name.right").textContent.trim();
            for (const letraGrupo in torneoData.grupos) {
                const partido = torneoData.grupos[letraGrupo].partidos.find(
                    p => p.local === equipoLocal && p.visitante === equipoVisitante
                );
                if (partido) {
                    const displayLocal = filaPartido.querySelector('.score-display[data-type="local"]');
                    const displayVisitante = filaPartido.querySelector('.score-display[data-type="visitante"]');
                    if (displayLocal) displayLocal.textContent = partido.golesLocal ?? 0;
                    if (displayVisitante) displayVisitante.textContent = partido.golesVisitante ?? 0;
                    filaPartido.classList.toggle("partido-confirmado", partido.jugado === true);
                }
            }
        });
    }

    function normalizarPartidosGrupo() {
        for (const letra in torneoData.grupos) {
            torneoData.grupos[letra].partidos.forEach(p => {
                const teniaMarcadorGuardado = p.golesLocal !== null && p.golesVisitante !== null;
                if (p.golesLocal === null || p.golesLocal === undefined) p.golesLocal = 0;
                if (p.golesVisitante === null || p.golesVisitante === undefined) p.golesVisitante = 0;
                if (p.jugado === undefined) {
                    p.jugado = teniaMarcadorGuardado;
                }
                if (p.jugado !== true) p.jugado = false;
            });
        }
    }

    function aplicarMarcadorAPartido(partido, golesLocal, golesVisitante) {
        partido.golesLocal = golesLocal;
        partido.golesVisitante = golesVisitante;
        partido.jugado = true;
    }

    function confirmarMarcadorDesdeFila(fila) {
        const local = fila.querySelector(".team-name.left")?.textContent.trim();
        const visitante = fila.querySelector(".team-name.right")?.textContent.trim();
        if (!local || !visitante) return;

        const golesLocal = parseInt(fila.querySelector('.score-display[data-type="local"]')?.textContent, 10) || 0;
        const golesVisitante = parseInt(fila.querySelector('.score-display[data-type="visitante"]')?.textContent, 10) || 0;

        for (const g in torneoData.grupos) {
            const p = torneoData.grupos[g].partidos.find(x => x.local === local && x.visitante === visitante);
            if (p) {
                if (p.jugado && p.golesLocal === golesLocal && p.golesVisitante === golesVisitante) return;
                aplicarMarcadorAPartido(p, golesLocal, golesVisitante);
                fila.classList.add("partido-confirmado");
                calcularTablaYActualizar();
                guardarMarcadoresEnLocalStorage();
                break;
            }
        }
    }

    function cargarMarcadoresGuardados() {
        registrationFormAutoOpened = true;
        registrationCompleted = false;
        registrationData = null;

        const datosLocales = localStorage.getItem(STORAGE_KEY);
        if (datosLocales) {
            try {
                const datosParseados = JSON.parse(datosLocales);
                if (datosParseados?.grupos) {
                    Object.assign(torneoData.grupos, datosParseados.grupos);
                    normalizarPartidosGrupo();
                }
                if (Array.isArray(datosParseados?.bracketWinners)) {
                    savedBracketWinners = datosParseados.bracketWinners;
                } else if (datosParseados?.winnerSlot) {
                    savedBracketWinners = [datosParseados.winnerSlot];
                }
            } catch (error) {
                console.error("Error al leer localStorage:", error);
            }
        }

        sincronizarMarcadoresUI();
        calcularTablaYActualizar();
        restoreBracketWinners(savedBracketWinners);
        updateBracketProgression();
        actualizarVisibilidadExportar();
    }

    // ==========================================================
    // MOTOR DE CLASIFICACIÓN
    // ==========================================================
    window.actualizarSlot = function(slotId, nombreEquipo) {
        const elemento = document.getElementById(slotId);
        if (!elemento) return;
        const span = elemento.querySelector(".team-name-bracket");
        if (span) span.textContent = nombreEquipo || "...";
    };

    const bracketPlaceholders = new Map();

    function preserveBracketPlaceholders() {
        document.querySelectorAll(".bracket-team").forEach(el => {
            const text = el.querySelector(".team-name-bracket")?.textContent.trim() || "";
            bracketPlaceholders.set(el.id, text);
        });
    }

    function getGroupRanking(grupo) {
        const tabla = {};
        const pj = {};
        grupo.equipos.forEach(eq => {
            tabla[eq] = { pts: 0, gf: 0, gc: 0 };
            pj[eq] = 0;
        });

        grupo.partidos.forEach(p => {
            const gl = p.golesLocal ?? 0;
            const gv = p.golesVisitante ?? 0;

            tabla[p.local].gf += gl;
            tabla[p.local].gc += gv;
            tabla[p.visitante].gf += gv;
            tabla[p.visitante].gc += gl;
            pj[p.local]++;
            pj[p.visitante]++;

            if (gl > gv) tabla[p.local].pts += 3;
            else if (gv > gl) tabla[p.visitante].pts += 3;
            else { tabla[p.local].pts += 1; tabla[p.visitante].pts += 1; }
        });

        const ranking = Object.keys(tabla).sort((a, b) => {
            if (tabla[b].pts !== tabla[a].pts) return tabla[b].pts - tabla[a].pts;
            const difA = tabla[a].gf - tabla[a].gc;
            const difB = tabla[b].gf - tabla[b].gc;
            if (difB !== difA) return difB - difA;
            return tabla[b].gf - tabla[a].gf;
        });

        return { ranking, tabla, pj };
    }

    function updateStandingsTables(groupRankings) {
        for (const letra in groupRankings) {
            const tbody = document.getElementById(`standings-${letra}`);
            if (!tbody) continue;

            const { ranking, tabla, pj } = groupRankings[letra];
            tbody.innerHTML = ranking.map((equipo, idx) => {
                const s = tabla[equipo];
                const dif = s.gf - s.gc;
                const posClass = idx === 0 ? "pos-first" : idx === 1 ? "pos-second" : idx === 2 ? "pos-third" : "";
                const difStr = dif >= 0 ? `+${dif}` : String(dif);
                return `<tr class="${posClass}">
                    <td>${idx + 1}</td>
                    <td class="standings-team">${equipo}</td>
                    <td>${pj[equipo]}</td>
                    <td>${s.gf}</td>
                    <td>${s.gc}</td>
                    <td>${difStr}</td>
                    <td>${s.pts}</td>
                </tr>`;
            }).join("");
        }
    }

    function isBracketPlaceholder(name) {
        return /^(?:1[A-L]|2[A-L]|3[A-L](?:\/[A-L]){0,2}|Gan\.|Gan\. 16|Gan\. 8|Gan\. C|Gan\. S)/.test(name);
    }

    function clearBracketWinners() {
        document.querySelectorAll(".bracket-team.winner").forEach(el => el.classList.remove("winner"));
    }

    function fillBracketFromGroupRankings(groupRankings) {
        const thirdPlaces = [];

        for (const letra in groupRankings) {
            const { ranking, tabla } = groupRankings[letra];
            if (ranking[0]) actualizarSlot(bracketSlotConfig.firstPlace[letra], ranking[0]);
            if (ranking[1]) actualizarSlot(bracketSlotConfig.secondPlace[letra], ranking[1]);
            if (ranking[2]) {
                const stats = tabla[ranking[2]];
                thirdPlaces.push({
                    team: ranking[2],
                    pts: stats.pts,
                    diff: stats.gf - stats.gc,
                    gf: stats.gf
                });
            }
        }

        thirdPlaces.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.diff !== a.diff) return b.diff - a.diff;
            return b.gf - a.gf;
        });

        bracketSlotConfig.thirdPlaceSlots.forEach((slotId, index) => {
            const name = thirdPlaces[index]?.team || bracketPlaceholders.get(slotId) || "...";
            actualizarSlot(slotId, name);
        });
    }

    function getBracketMatchWinner(stage, matchId) {
        const topSlot = document.getElementById(`slot-${stage}-${matchId}-top`);
        const bottomSlot = document.getElementById(`slot-${stage}-${matchId}-bottom`);
        if (!topSlot || !bottomSlot) return null;

        const topTeam = topSlot.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomTeam = bottomSlot.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topTeam || !bottomTeam || isBracketPlaceholder(topTeam) || isBracketPlaceholder(bottomTeam)) return null;
        if (topSlot.classList.contains("winner")) return topTeam;
        if (bottomSlot.classList.contains("winner")) return bottomTeam;
        return null;
    }

    function updateBracketProgression() {
        Object.values(bracketProgression).forEach(stagePairs => {
            stagePairs.forEach(pair => {
                const targetId = pair.targetTop || pair.targetBottom;
                const placeholder = bracketPlaceholders.get(targetId) || "...";
                const winner = getBracketMatchWinner(pair.source.stage, pair.source.match);
                actualizarSlot(targetId, winner || placeholder);
            });
        });
        renderPodium();
    }

    function renderPodium() {
        const finalTop = document.getElementById("slot-final-top");
        const finalBottom = document.getElementById("slot-final-bottom");
        const podium1 = document.getElementById("podium-1");
        const podium2 = document.getElementById("podium-2");
        if (!finalTop || !finalBottom || !podium1 || !podium2) return;

        const topName = finalTop.querySelector(".team-name-bracket")?.textContent.trim() || "...";
        const bottomName = finalBottom.querySelector(".team-name-bracket")?.textContent.trim() || "...";

        let champion = "...";
        let runner = "...";
        if (finalTop.classList.contains("winner")) { champion = topName; runner = bottomName; }
        else if (finalBottom.classList.contains("winner")) { champion = bottomName; runner = topName; }

        podium1.textContent = champion;
        podium2.textContent = runner;
        actualizarVisibilidadExportar();
    }

    function handleBracketClick(element) {
        const slotId = element.id;
        const matchParts = slotId.match(/^slot-([a-z0-9]+)(?:-P(\d+))?-(top|bottom)$/);
        if (!matchParts) return;

        const [, stage, matchId] = matchParts;
        const topId = matchId ? `slot-${stage}-P${matchId}-top` : `slot-${stage}-top`;
        const bottomId = matchId ? `slot-${stage}-P${matchId}-bottom` : `slot-${stage}-bottom`;
        const top = document.getElementById(topId);
        const bottom = document.getElementById(bottomId);
        if (!top || !bottom) return;

        const topName = top.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomName = bottom.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topName || !bottomName) return;
        if (isBracketPlaceholder(topName) || isBracketPlaceholder(bottomName)) return;

        if (element.classList.contains("winner")) {
            top.classList.remove("winner");
            bottom.classList.remove("winner");
        } else {
            top.classList.remove("winner");
            bottom.classList.remove("winner");
            element.classList.add("winner");
        }

        updateBracketProgression();
        guardarMarcadoresEnLocalStorage();
        actualizarVisibilidadExportar();
    }

    window.calcularTablaYActualizar = function() {
        const groupRankings = {};

        for (const letra in torneoData.grupos) {
            groupRankings[letra] = getGroupRanking(torneoData.grupos[letra]);
        }

        updateStandingsTables(groupRankings);
        clearBracketWinners();
        fillBracketFromGroupRankings(groupRankings);
        updateBracketProgression();
        actualizarVisibilidadExportar();
    };

    // ==========================================================
    // VALIDACIÓN EXPORTAR (campeón + subcampeón)
    // ==========================================================
    function nombrePodioValido(nombre) {
        return Boolean(nombre && nombre !== "..." && !isBracketPlaceholder(nombre));
    }

    function tienePodioDefinido() {
        const campeon = document.getElementById("podium-1")?.textContent.trim() || "";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "";
        return nombrePodioValido(campeon) && nombrePodioValido(subcampeon);
    }

    function getGanadorPartidoLlave(rondaId, partidoId) {
        const topEl = document.getElementById(slotId(rondaId, partidoId, "top"));
        const bottomEl = document.getElementById(slotId(rondaId, partidoId, "bottom"));
        if (!topEl || !bottomEl) return null;

        const topName = topEl.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomName = bottomEl.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topName || !bottomName || isBracketPlaceholder(topName) || isBracketPlaceholder(bottomName)) {
            return null;
        }
        if (topEl.classList.contains("winner")) return topName;
        if (bottomEl.classList.contains("winner")) return bottomName;
        return null;
    }

    let registrationFormAutoOpened = true;
    let registrationPdfBlob = null;
    let registrationPdfFileName = "";
    let registrationCompleted = false;
    let registeredPodioKey = "";
    let registrationData = null;

    function getCurrentPodioKey() {
        const campeon = document.getElementById("podium-1")?.textContent.trim() || "";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "";
        return `${campeon}|${subcampeon}`;
    }

    function updateExportButtonState() {
        const exportButton = document.getElementById("btn-exportar-pdf");
        if (!exportButton) return;
        exportButton.hidden = !registrationCompleted;
        exportButton.disabled = !registrationCompleted;
        exportButton.setAttribute("aria-hidden", registrationCompleted ? "false" : "true");
    }

    function actualizarVisibilidadExportar() {
        const contenedor = document.getElementById("export-actions");
        if (!contenedor) return;
        const listo = tienePodioDefinido();
        contenedor.hidden = !listo;
        contenedor.setAttribute("aria-hidden", listo ? "false" : "true");

        if (!listo) {
            registrationCompleted = false;
            registeredPodioKey = "";
        } else if (registrationCompleted) {
            const currentKey = getCurrentPodioKey();
            if (registeredPodioKey && currentKey !== registeredPodioKey) {
                registrationCompleted = false;
            }
        }

        updateExportButtonState();

        // Nunca abrir el formulario automáticamente
        // if (listo && !registrationCompleted) {
        //     showRegistrationFormIfReady();
        // }
    }

    function openRegistrationForm() {
        const modal = document.getElementById("registration-modal");
        if (!modal) return;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        prepareRegistrationFormPDF();
    }

    function showRegistrationFormIfReady() {
        if (registrationFormAutoOpened || !tienePodioDefinido()) return;
        // Desactivado: no abrir el formulario automáticamente
        // registrationFormAutoOpened = true;
        // openRegistrationForm();
    }

    function handleRegistrationSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const nombre = form.nombre.value.trim();
        const cedula = form.cedula.value.trim();
        const email = form.email.value.trim();
        const comentario = form.comentario.value.trim();
        const consent = form.consent.checked;

        if (!nombre || !cedula || !email || !consent) {
            alert("Completa todos los campos obligatorios y acepta el consentimiento.");
            return;
        }

        if (!registrationPdfBlob) {
            prepareRegistrationFormPDF();
        }

        if (!registrationPdfBlob) {
            alert("El PDF aún no está listo. Recarga la página o intenta de nuevo en unos segundos.");
            return;
        }

        registrationData = {
            nombre,
            cedula,
            email,
            comentario,
            fecha: new Date().toISOString(),
            campeon: document.getElementById("podium-1")?.textContent.trim() || "",
            subcampeon: document.getElementById("podium-2")?.textContent.trim() || ""
        };

        guardarRegistroEnLocalStorage(registrationData);

        const submitBtn = form.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";
        }

        const formData = new FormData(form);
        formData.append("pdf_attachment", registrationPdfBlob, registrationPdfFileName);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);

        xhr.onload = function() {
            console.log("Registro enviado a FormSubmit:", registrationData);
            registrationCompleted = true;
            registeredPodioKey = getCurrentPodioKey();
            updateExportButtonState();
            updateRegistrationAttachmentPreview();
            showDownloadButton();
            // update UI: hide registration/open buttons and show 'Realizar nueva polla'
            setPostSubmissionUI();
            alert("Formulario enviado correctamente. Ahora puedes descargar el PDF.");
            hideRegistrationForm();
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Participación";
            }
        };

        xhr.onerror = function() {
            console.error("Error al enviar el formulario");
            alert("Hubo un error al enviar. Verifica tu conexión e intenta de nuevo.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Participación";
            }
        };

        xhr.send(formData);
    }

    function guardarRegistroEnLocalStorage(datos) {
        try {
            const registros = JSON.parse(localStorage.getItem("pollaRegistros") || "[]");
            registros.push(datos);
            localStorage.setItem("pollaRegistros", JSON.stringify(registros));
            console.log("Registro guardado en localStorage");
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }

    function showDownloadButton() {
        const downloadBtn = document.getElementById("btn-download-registration-pdf");
        if (!downloadBtn) return;
        downloadBtn.hidden = false;
    }

    function setPostSubmissionUI() {
        const exportBtn = document.getElementById("btn-exportar-pdf");
        const openRegBtn = document.getElementById("btn-open-registration-form");
        const newPollaBtn = document.getElementById("btn-new-polla");
        if (exportBtn) {
            // keep export button visible after submission until user chooses to start a new polla
            exportBtn.hidden = false;
            exportBtn.setAttribute("aria-hidden", "false");
        }
        if (openRegBtn) {
            openRegBtn.hidden = true;
            openRegBtn.setAttribute("aria-hidden", "true");
        }
        if (newPollaBtn) {
            newPollaBtn.hidden = false;
            newPollaBtn.setAttribute("aria-hidden", "false");
        }
    }

    function resetAppToInitialState() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem("pollaRegistros");
            // reset in-memory state
            registrationCompleted = false;
            registeredPodioKey = "";
            registrationData = null;
        } catch (err) {
            console.error("Error clearing storage:", err);
        }
        // reload the page to initial load state
        window.location.reload();
    }

    function hideRegistrationForm() {
        const modal = document.getElementById("registration-modal");
        if (!modal) return;
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
    }

    // ==========================================================
    // EXPORTAR PDF
    // ==========================================================
    function formatMarcadorPartido(partido) {
        const gl = partido.golesLocal ?? 0;
        const gv = partido.golesVisitante ?? 0;
        return `${gl} - ${gv}`;
    }

    function getNombreEnSlot(rondaId, partidoId, posicion) {
        const el = document.getElementById(slotId(rondaId, partidoId, posicion));
        return el?.querySelector(".team-name-bracket")?.textContent.trim() || "—";
    }

    function buildPdfDocument() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const margin = 14;
        let y = 18;
        const pageH = doc.internal.pageSize.getHeight();

        const fecha = new Date().toLocaleString("es-ES", {
            dateStyle: "long",
            timeStyle: "short"
        });

        doc.setFontSize(18);
        doc.setFont(undefined, "bold");
        doc.text("Mundial 2026 — Simulación completa", margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(`Generado: ${fecha}`, margin, y);
        y += 10;
        doc.setTextColor(0, 0, 0);

        if (registrationData) {
            doc.setFontSize(12);
            doc.setFont(undefined, "bold");
            doc.text("Datos del Participante", margin, y);
            y += 6;
            doc.setFontSize(10);
            doc.setFont(undefined, "normal");
            doc.text(`Nombre: ${registrationData.nombre}`, margin, y);
            y += 5;
            doc.text(`Cédula: ${registrationData.cedula}`, margin, y);
            y += 5;
            doc.text(`Correo: ${registrationData.email}`, margin, y);
            y += 5;
            if (registrationData.comentario) {
                doc.text(`Comentarios: ${registrationData.comentario}`, margin, y);
                y += 5;
            }
            y += 6;
        }

        const campeon = document.getElementById("podium-1")?.textContent.trim() || "—";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "—";

        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Podio", margin, y);
        y += 6;
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text(`Campeón: ${campeon}`, margin, y);
        y += 5;
        doc.text(`Subcampeón: ${subcampeon}`, margin, y);
        y += 12;

        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Fase de grupos", margin, y);
        y += 4;

        const letras = Object.keys(torneoData.grupos).sort();

        letras.forEach(letra => {
            const grupo = torneoData.grupos[letra];
            const { ranking, tabla, pj } = getGroupRanking(grupo);

            if (y > pageH - 50) {
                doc.addPage();
                y = 18;
            }

            doc.setFontSize(11);
            doc.setFont(undefined, "bold");
            doc.text(`Grupo ${letra}`, margin, y);
            y += 2;

            const filasTabla = ranking.map((equipo, idx) => {
                const s = tabla[equipo];
                const dif = s.gf - s.gc;
                return [
                    String(idx + 1),
                    equipo,
                    String(pj[equipo]),
                    String(s.gf),
                    String(s.gc),
                    dif >= 0 ? `+${dif}` : String(dif),
                    String(s.pts)
                ];
            });

            doc.autoTable({
                head: [["#", "Equipo", "PJ", "GF", "GC", "DIF", "PTS"]],
                body: filasTabla,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [13, 59, 142], textColor: 255 },
                theme: "grid"
            });

            y = doc.lastAutoTable.finalY + 4;

            const filasPartidos = grupo.partidos.map(p => [
                p.local,
                formatMarcadorPartido(p),
                p.visitante
            ]);

            doc.autoTable({
                head: [["Local", "Marcador", "Visitante"]],
                body: filasPartidos,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [9, 35, 94], textColor: 255 },
                theme: "striped"
            });

            y = doc.lastAutoTable.finalY + 10;
        });

        doc.addPage();
        y = 18;
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Llaves finales", margin, y);
        y += 8;

        torneoData.llaves.rondas.forEach(ronda => {
            if (y > pageH - 40) {
                doc.addPage();
                y = 18;
            }

            doc.setFontSize(11);
            doc.setFont(undefined, "bold");
            doc.text(ronda.titulo, margin, y);
            y += 2;

            const filasLlave = ronda.partidos.map((partido, idx) => {
                const top = getNombreEnSlot(ronda.id, partido.id, "top");
                const bottom = getNombreEnSlot(ronda.id, partido.id, "bottom");
                const ganador = getGanadorPartidoLlave(ronda.id, partido.id);
                const etiqueta = partido.id || `Final`;
                return [
                    etiqueta,
                    top,
                    "vs",
                    bottom,
                    ganador ? ganador : "Sin elegir"
                ];
            });

            doc.autoTable({
                head: [["Partido", "Equipo 1", "", "Equipo 2", "Ganador elegido"]],
                body: filasLlave,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [13, 59, 142], textColor: 255 },
                columnStyles: {
                    2: { cellWidth: 8, halign: "center" }
                },
                theme: "grid"
            });

            y = doc.lastAutoTable.finalY + 10;
        });

        return doc;
    }

    function createPdfBlobForRegistration() {
        if (!window.jspdf?.jsPDF) {
            return null;
        }
        try {
            const doc = buildPdfDocument();
            return doc.output("blob");
        } catch (error) {
            console.error("Error creando el PDF:", error);
            return null;
        }
    }

    function updateRegistrationAttachmentPreview() {
        const preview = document.getElementById("pdf-attachment-preview");
        if (!preview) return;
        if (registrationCompleted) {
            preview.textContent = `Formulario enviado. Adjunte: ${registrationPdfFileName}`;
        } else {
            preview.textContent = registrationPdfBlob ? `Adjunto: ${registrationPdfFileName}` : "Generando PDF listo para adjuntar...";
        }
    }

    function prepareRegistrationFormPDF() {
        registrationPdfFileName = `polla-mundial-2026-${new Date().toISOString().slice(0, 10)}.pdf`;
        const blob = createPdfBlobForRegistration();
        if (blob) {
            registrationPdfBlob = new File([blob], registrationPdfFileName, { type: "application/pdf" });
        }
        updateRegistrationAttachmentPreview();
    }

    function downloadRegistrationPdf() {
        if (!registrationPdfBlob) {
            alert("El PDF aún no está listo. Intenta de nuevo en unos segundos.");
            return;
        }
        const url = URL.createObjectURL(registrationPdfBlob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = registrationPdfFileName;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    function exportarPDF() {
        if (!tienePodioDefinido()) {
            alert("Para exportar, elige el ganador de la Gran Final (pestaña Llaves → Final). El podio debe mostrar campeón y subcampeón.");
            return;
        }

        if (!window.jspdf?.jsPDF) {
            alert("No se pudo cargar la librería PDF. Recarga la página e intenta de nuevo.");
            return;
        }

        const btn = document.getElementById("btn-exportar-pdf");
        if (btn) {
            btn.disabled = true;
            btn.textContent = "Generando PDF...";
        }

        try {
            const doc = buildPdfDocument();
            const nombreArchivo = `polla-mundial-2026-${new Date().toISOString().slice(0, 10)}.pdf`;
            doc.save(nombreArchivo);
        } catch (error) {
            console.error("Error al exportar PDF:", error);
            alert("Ocurrió un error al generar el PDF. Revisa la consola para más detalles.");
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = "Exportar PDF completo";
            }
        }
    }

    function escapeCsvValue(value) {
        const text = String(value ?? "");
        if (/[";\n\r]/.test(text)) {
            return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
    }

    function buildGroupStageCsv() {
        const headers = ["Grupo", "Local", "Visitante", "Goles Local", "Goles Visitante", "Jugado"];
        const rows = [headers];

        Object.keys(torneoData.grupos).sort().forEach(letra => {
            const grupo = torneoData.grupos[letra];
            grupo.partidos.forEach(partido => {
                rows.push([
                    letra,
                    partido.local,
                    partido.visitante,
                    partido.golesLocal ?? 0,
                    partido.golesVisitante ?? 0,
                    partido.jugado ? "Sí" : "No"
                ]);
            });
        });

        return rows.map(row => row.map(escapeCsvValue).join(";")).join("\r\n");
    }

    function descargarGruposCsv() {
        const csvContent = buildGroupStageCsv();
        const blob = new Blob(["\uFEFF", csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = `partidos-fase-grupos-2026-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    // ==========================================================
    // EVENTOS
    // ==========================================================
    document.body.addEventListener("click", (e) => {
        const bracketTarget = e.target.closest?.(".team-row-clickable");
        if (bracketTarget) {
            handleBracketClick(bracketTarget);
            return;
        }

        const filaMarcador = e.target.closest?.(".match-row");
        if (filaMarcador && !e.target.closest?.("button.btn-counter")) {
            confirmarMarcadorDesdeFila(filaMarcador);
            return;
        }

        const boton = e.target.closest?.("button.btn-counter");
        if (!boton) return;

        const fila = boton.closest(".match-row");
        if (!fila) return;

        const tipoId = boton.getAttribute("data-type");
        const display = fila.querySelector(`.score-display[data-type="${tipoId}"]`);
        if (!display) return;

        let val = parseInt(display.textContent, 10) || 0;
        if (boton.classList.contains("plus") && val < 15) val++;
        else if (boton.classList.contains("minus") && val > 0) val--;
        display.textContent = val;

        const local = fila.querySelector(".team-name.left").textContent.trim();
        const vis = fila.querySelector(".team-name.right").textContent.trim();
        const golesLocal = parseInt(fila.querySelector('.score-display[data-type="local"]').textContent, 10) || 0;
        const golesVisitante = parseInt(fila.querySelector('.score-display[data-type="visitante"]').textContent, 10) || 0;

        for (const g in torneoData.grupos) {
            const p = torneoData.grupos[g].partidos.find(x => x.local === local && x.visitante === vis);
            if (p) {
                aplicarMarcadorAPartido(p, golesLocal, golesVisitante);
                fila.classList.add("partido-confirmado");
                calcularTablaYActualizar();
                guardarMarcadoresEnLocalStorage();
                break;
            }
        }
    });

    document.querySelectorAll(".tab").forEach(boton => {
        boton.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            boton.classList.add("active");
            document.getElementById(boton.getAttribute("data-target")).classList.add("active");
        });
    });

    document.getElementById("group-selector-nav")?.addEventListener("click", (e) => {
        const boton = e.target.closest(".selector-btn");
        if (!boton) return;
        document.querySelectorAll(".selector-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".group-card").forEach(t => t.classList.remove("active"));
        boton.classList.add("active");
        document.getElementById(`card-grupo-${boton.getAttribute("data-group")}`)?.classList.add("active");
    });

    document.getElementById("ronda-selector-nav")?.addEventListener("click", (e) => {
        const boton = e.target.closest(".ronda-btn");
        if (!boton) return;
        document.querySelectorAll(".ronda-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".bracket-column").forEach(c => c.classList.remove("active"));
        boton.classList.add("active");
        document.getElementById(`ronda-${boton.getAttribute("data-ronda")}`)?.classList.add("active");
    });

    document.getElementById("btn-exportar-pdf")?.addEventListener("click", exportarPDF);
    document.getElementById("btn-exportar-grupos-csv")?.addEventListener("click", descargarGruposCsv);
    document.getElementById("btn-open-registration-form")?.addEventListener("click", openRegistrationForm);
    document.getElementById("btn-download-registration-pdf")?.addEventListener("click", downloadRegistrationPdf);
    document.getElementById("close-registration-form")?.addEventListener("click", hideRegistrationForm);
    document.getElementById("registration-backdrop")?.addEventListener("click", hideRegistrationForm);
    document.getElementById("registration-form")?.addEventListener("submit", handleRegistrationSubmit);
    document.getElementById("btn-new-polla")?.addEventListener("click", resetAppToInitialState);

    // ==========================================================
    // INICIALIZACIÓN
    // ==========================================================
    normalizarPartidosGrupo();
    renderizarGrupos();
    renderizarLlaves();
    preserveBracketPlaceholders();
    cargarMarcadoresGuardados();
    actualizarVisibilidadExportar();
});