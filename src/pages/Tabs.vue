<template>
  <div>

    <h1>Tabs</h1>

    <div>
      <div class="vie-tabs vie-tabs-top">
        <div role="tablist" class="vie-tabs-bar" tabindex="0">
          <div class="vie-tabs-ink-bar vie-tabs-ink-bar-animated" style="display: block; transform: translate3d(240px, 0px, 0px); width: 120px;"></div>
          <div role="tab" aria-disabled="false" aria-selected="false" class=" vie-tabs-tab">选项卡一</div>
          <div role="tab" aria-disabled="false" aria-selected="false" class=" vie-tabs-tab">选项卡二</div>
          <div role="tab" aria-disabled="false" aria-selected="true" class="vie-tabs-tab-active vie-tabs-tab">选项卡三</div>
        </div>
        <div class="vie-tabs-content vie-tabs-content-animated" style="transform: translateX(-200%) translateZ(0px); touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡一内容</div>
          </div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡二内容</div>
          </div>
          <div role="tabpanel" aria-hidden="false" class="vie-tabs-tabpane vie-tabs-tabpane-active">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡三内容</div>
          </div>
        </div>
      </div>
      <div class="vie-whitespace vie-whitespace-md"></div>
    </div>

    <div>
      <div class="vie-whitespace vie-whitespace-md"></div>
      <div class="vie-tabs vie-tabs-top">
        <div role="tablist" class="vie-tabs-bar" tabindex="0">
          <div class="vie-tabs-ink-bar vie-tabs-ink-bar-no-animated" style="display: block; transform: translate3d(120px, 0px, 0px); width: 120px;"></div>
          <div role="tab" aria-disabled="false" aria-selected="false" class=" vie-tabs-tab">选项卡一</div>
          <div role="tab" aria-disabled="false" aria-selected="true" class="vie-tabs-tab-active vie-tabs-tab">选项卡二</div>
          <div role="tab" aria-disabled="false" aria-selected="false" class=" vie-tabs-tab">选项卡三</div>
        </div>
        <div class="vie-tabs-content vie-tabs-content-no-animated" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡一内容</div>
          </div>
          <div role="tabpanel" aria-hidden="false" class="vie-tabs-tabpane vie-tabs-tabpane-active">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡二内容</div>
          </div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项卡三内容</div>
          </div>
        </div>
      </div>
      <div class="vie-whitespace vie-whitespace-md"></div>
    </div>

    <div>
      <div class="vie-tabs vie-tabs-top">
        <div role="tablist" class="vie-tabs-bar" tabindex="0">
          <div class="vie-tabs-nav-container vie-tabs-nav-swipe-container vie-tabs-nextpage">
            <div class="vie-tabs-nav-wrap">
              <div class="vie-tabs-nav-swipe" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transform: translate3d(0px, 0px, 0px);">
                <div class="vie-tabs-nav">
                  <div class="vie-tabs-ink-bar vie-tabs-ink-bar-animated" style="display: block; transform: translate3d(576px, 0px, 0px); width: 72px;"></div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项0</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项1</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项2</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项3</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项4</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项5</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项6</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项7</div>
                  <div role="tab" aria-disabled="false" aria-selected="true" class="vie-tabs-tab vie-tabs-tab-active" style="flex-basis: 20%;">选项8</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项9</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项10</div>
                  <div role="tab" aria-disabled="false" aria-selected="false" class="vie-tabs-tab" style="flex-basis: 20%;">选项11</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vie-tabs-content vie-tabs-content-animated" style="transform: translateX(-800%) translateZ(0px); touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="false" class="vie-tabs-tabpane vie-tabs-tabpane-active">
            <div style="display: flex; align-items: center; justify-content: center; height: 5rem; background-color: rgb(255, 255, 255);">选项8内容</div>
          </div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
          <div role="tabpanel" aria-hidden="true" class="vie-tabs-tabpane vie-tabs-tabpane-inactive"></div>
        </div>
      </div>
      <div class="vie-whitespace vie-whitespace-md"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
