import { getRole } from '../role.js';

export const meta = { title: 'Tareas', breadcrumb: 'Equipo · Tareas del día' };

export function render(data) {
  const isSA = getRole() === 'senior_agent';
  // Senior agent sees only high+medium priority tasks tied to her clients
  const agentClients = isSA
    ? data.clients.filter(c => c.agent === 'Ana Rodríguez').map(c => `${c.firstName} ${c.lastName}`)
    : null;
  const tasks = agentClients
    ? data.tasks.filter(t => !t.client || agentClients.includes(t.client))
    : data.tasks;
  const pending = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Tareas</h1>
    <div style="display:flex;gap:8px;align-items:center;margin-left:8px">
      <span class="count-badge count-red">${pending.length} pendientes</span>
      <span style="font-size:11px;color:var(--sub)">${done.length} completadas hoy</span>
    </div>
    <div class="view-actions">
      <button class="btn btn-primary btn-sm" onclick="openNuevaTareaModal()">+ Nueva tarea</button>
    </div>
  </div>

  <!-- Filters -->
  <div class="filter-bar">
    <span class="filter-pill active" data-prio="all">Todas <span class="count">${tasks.length}</span></span>
    <span class="filter-pill" data-prio="high">Alta prioridad <span class="count">${tasks.filter(t=>t.priority==='high').length}</span></span>
    <span class="filter-pill" data-prio="medium">Media <span class="count">${tasks.filter(t=>t.priority==='medium').length}</span></span>
    <span class="filter-pill" data-prio="low">Baja <span class="count">${tasks.filter(t=>t.priority==='low').length}</span></span>
  </div>

  <!-- Pendientes -->
  <div class="panel" style="margin-bottom:16px">
    <div class="panel-header">
      <span class="panel-title">Pendientes</span>
      <span class="count-badge count-red">${pending.length}</span>
    </div>
    <div style="padding:8px 16px">
      <ul class="task-list" id="tasks-pending">
        ${pending.map(t => taskHTML(t)).join('')}
      </ul>
    </div>
  </div>

  <!-- Completadas -->
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">Completadas hoy</span>
      <span style="font-size:11px;color:var(--green-txt)">${done.length}</span>
    </div>
    <div style="padding:8px 16px">
      <ul class="task-list" id="tasks-done">
        ${done.map(t => taskHTML(t)).join('')}
      </ul>
    </div>
  </div>

</div>`;
}

function taskHTML(t) {
  return `
    <li class="task-item" data-id="${t.id}" data-priority="${t.priority}">
      <div class="task-check ${t.done ? 'done' : ''}" onclick="toggleTask(${t.id})"></div>
      <div class="task-prio ${t.priority === 'high' ? 'prio-high' : t.priority === 'medium' ? 'prio-medium' : 'prio-low'}"></div>
      <div style="flex:1">
        <div class="task-text ${t.done ? 'done' : ''}">${t.text}</div>
        ${t.client ? `<div class="task-meta">👤 ${t.client}</div>` : ''}
      </div>
      <div style="text-align:right">
        <div class="task-meta" style="margin-bottom:4px">${t.due}</div>
        <div style="display:flex;gap:4px;justify-content:flex-end">
          <button class="btn btn-ghost btn-xs">Editar</button>
        </div>
      </div>
    </li>`;
}

export function init() {
  window.toggleTask = (id) => {
    const li = document.querySelector(`.task-item[data-id="${id}"]`);
    if (!li) return;
    const check = li.querySelector('.task-check');
    const text = li.querySelector('.task-text');
    check.classList.toggle('done');
    text.classList.toggle('done');
  };
  window.addTaskPrompt = () => {
    const text = prompt('Descripción de la nueva tarea:');
    if (!text) return;
    const ul = document.getElementById('tasks-pending');
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div class="task-check"></div>
      <div class="task-prio prio-medium"></div>
      <div class="task-text">${text}</div>
      <div class="task-meta">Hoy</div>`;
    ul.appendChild(li);
  };
  // Filters
  document.querySelectorAll('.filter-pill[data-prio]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const prio = pill.dataset.prio;
      document.querySelectorAll('.task-item').forEach(item => {
        item.style.display = (prio === 'all' || item.dataset.priority === prio) ? '' : 'none';
      });
    });
  });
}
