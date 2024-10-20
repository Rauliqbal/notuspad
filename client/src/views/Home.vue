<template>
  <div>
    <div class="flex gap-4">
      <div v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ column.name }}
          </div>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(column.id, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <h3>Task # {{ card.number }}</h3>
                <p class="card-text">{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, scene } from "../utils";

export default {
  name: "Cards",

  components: { Container, Draggable },

  data() {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },

  methods: {
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter((p) => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);

        this.scene = scene;
      }
    },

    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ];
      };
    },

    dragStart() {
      console.log("drag started");
    },

    log(...params) {
      console.log(...params);
    },
  },
};
</script>

<style scoped>
.kanban {
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  user-select: none;
}
.kanban__move-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #b0b0b0;
  user-select: none;
}
.kanban__move-icon span {
  margin-left: 10px;
}
.kanban__move-icon svg {
  width: 20px;
  height: 20px;
}
.kanban__drop-preview {
  position: relative;
  margin: 10px;
  background-color: #edf1f3;
  border: 2px dashed rgba(0, 0, 0, 0.059);
  border-radius: 4px;
}
.kanban__drop-preview::before {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #b0b0b0;
  transform: translate(-50%, -50%);
}
.kanban__drop-preview::after {
  position: absolute;
  top: 50%;
  left: 27%;
  width: 20px;
  height: 20px;
  content: "";
  transform: translate(-50%, -50%);
}
.kanban__description {
  display: flex;
  align-items: center;
}
.kanban__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf5f7;
  padding: 0.5rem;
  border-radius: 8px;
}
.kanban__title {
  margin: 0 0 0 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #555;
}
.kanban__quantity {
  margin-top: 0;
  font-size: small;
  color: #b0b0b0;
  text-align: right;
}
.kanban__quantity--inner-count {
  margin: 1rem 1rem 0 1rem;
  padding-top: 0.5rem;
}
.kanban__column {
  flex: 1;
  height: fit-content;
  padding: 10px;
  border-radius: 6px;
  transition: height 0.5s ease;
  border: 1px solid #e0e0e0;
}
.kanban__column:not(:first-of-type) {
  margin-left: 15px;
}
.kanban__column--no-border {
  border: none;
}
.kanban__header {
  margin-bottom: 15px;
  background-color: #fff;
}
.kanban__content {
  position: relative;
}
.kanban__skeleton {
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-right: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
  overflow: auto;
}
.kanban__skeleton-container {
  width: 100%;
}
.kanban__skeleton-column {
  flex: 1;
  height: calc(100% - 30px);
  padding: 10px;
  margin-left: 15px;
  background-color: #e9e9e9;
  border-radius: 6px;
}
.kanban__skeleton-card {
  position: relative;
  height: 100px;
  padding: 15px;
  margin-top: 16px;
  background-color: #f5f5f5;
  border-radius: 6px;
}
.kanban__skeleton-card--one {
  position: absolute;
  top: 8px;
}
.kanban__skeleton-card--two {
  position: absolute;
  top: 8px;
  right: 10px;
}
.kanban__skeleton-card--three {
  position: absolute;
  top: 30px;
}
.kanban__skeleton-card--four {
  position: absolute;
  bottom: 2rem;
}
.kanban__skeleton-card--five {
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
}

.item,
.draggable-item,
.draggable-item-horizontal {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 8px;
  cursor: pointer;
  user-select: none;
  background-color: white;
  border: 1px solid transparent;
  border-left: 5px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.2s linear;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1);
}
.item .card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item .card small {
  color: #838383;
}
.item.open {
  border-left: 5px solid #f3c1c1;
}
.item.executing {
  border-left: 5px solid #c4ebaf;
}
.item.finished {
  border-left: 5px solid #b3d5e9;
}
.item.paralised {
  border-left: 5px solid #dc3545;
}
.item.review {
  border-left: 5px solid #e0e0e0;
}
.badge {
  margin: 1rem 0;
  cursor: pointer;
}
.label {
  color: #838383;
  margin-bottom: 5px;
}
.kanban-action {
  display: flex;
  justify-content: space-between;
}

.kanban-button {
  max-width: 130px;
  pointer-events: none;
  border: none;
  color: #f7f7f7;
  padding: 1px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 100px;
}

.kanban-button.open {
  background-color: #f3c1c1;
}
.kanban-button.executing {
  background-color: #c4ebaf;
}
.kanban-button.finished {
  background-color: #b3d5e9;
}
.kanban-button.paralised {
  background-color: #dc3545;
}
.kanban-button.review {
  background-color: #e0e0e0;
}

.kanban-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;
}
</style>
