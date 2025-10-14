import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'Inicio-nosotros-video',
  imports: [],
  templateUrl: './Inicio-Nosotros-Video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioNosotrosVideoComponent {

  videoPaused = signal(false);
  progress = signal(0);

  togglePlay(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
      this.videoPaused.set(false);
    } else {
      video.pause();
      this.videoPaused.set(true);
    }
  }

  trackProgress(video: HTMLVideoElement) {
    if (!video.paused) {
      this.progress.set((video.currentTime / video.duration) * 100);
    }
  }

  resetProgress() {
    this.progress.set(0);
  }

}
