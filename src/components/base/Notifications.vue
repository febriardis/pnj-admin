<template>
  <div class="notifications-banner">
    <notifications
      group="notifications"
      classes="vue-notification"
      :duration="2500"
      :width="300"
      animation-name="v-fade-left"
      position="top right"
    >
      <template slot="body" slot-scope="props">
        <div class="notifications" :class="props.item.type">
          <div class="notifications-left">
            <span class="notif-icon" :class="props.item.type">
              <i
                class="fas"
                :class="
                  props.item.type === 'success' ? 'fa-check' : 'fa-exclamation'
                "
              ></i>
            </span>
          </div>
          <div class="notifications-right">
            <p class="mb-0 font-weight-bold fsize-14">{{ props.item.type }}</p>
            <p class="mb-0 font-weight-normal">{{ props.item.text }}</p>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>

<style lang="scss">
.notifications {
  margin: 5px;
  display: flex;
  background: #ffffff;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  padding: 10px;
  &-left {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 25%;
    .notif-icon {
      color: #ffffff;
      border-radius: 100%;
      &.success {
        background: #2ab74d;
        padding: 5px 8px;
      }
      &.warning {
        background: #ff7c2a;
        padding: 5px 12px;
      }
      &.error {
        background: #d94849;
        padding: 5px 12px;
      }
    }
  }
  &-right {
    text-transform: capitalize;
    flex-basis: 85%;
  }

  &.success {
    background: #d5f7e4 !important;
    color: #1e8237;
  }
  &.warning {
    background: #fffae5 !important;
    color: #ff7c2a;
  }
  &.error {
    background: #fef1f1 !important;
    color: #b43b3c;
  }
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateY(-500px) scale(0.2);
}
</style>
