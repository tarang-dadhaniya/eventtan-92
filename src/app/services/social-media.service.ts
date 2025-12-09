import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface SocialMediaEntry {
  id: string;
  eventId: string;
  type: string;
  url: string;
  sequence: number;
}

@Injectable({
  providedIn: "root",
})
export class SocialMediaService {
  private readonly STORAGE_KEY = "eventtan_social_media";
  private socialMediaSubject = new BehaviorSubject<SocialMediaEntry[]>(
    this.loadFromStorage(),
  );

  private loadFromStorage(): SocialMediaEntry[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const socialMedia = stored ? JSON.parse(stored) : [];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(socialMedia));
    return socialMedia;
  }

  getSocialMedia(): SocialMediaEntry[] {
    return this.socialMediaSubject.value;
  }

  getSocialMediaByEvent(eventId: string): SocialMediaEntry[] {
    return this.getSocialMedia()
      .filter((entry) => entry.eventId === eventId)
      .sort((a, b) => a.sequence - b.sequence);
  }

  addSocialMedia(eventId: string, socialMedia: any): SocialMediaEntry[] {
    const entries: SocialMediaEntry[] = [];
    const allSocialMedia = this.getSocialMedia();
    const maxSequence =
      allSocialMedia.length > 0
        ? Math.max(...allSocialMedia.map((s) => s.sequence))
        : 0;

    let sequence = maxSequence + 1;

    if (socialMedia.socialMedia.blogRss && socialMedia.urls.blogRss) {
      entries.push({
        id: this.generateId(),
        eventId,
        type: "Blog/Rss",
        url: socialMedia.urls.blogRss,
        sequence: sequence++,
      });
    }

    if (socialMedia.socialMedia.facebook && socialMedia.urls.facebook) {
      entries.push({
        id: this.generateId(),
        eventId,
        type: "Facebook",
        url: socialMedia.urls.facebook,
        sequence: sequence++,
      });
    }

    if (socialMedia.socialMedia.twitter && socialMedia.urls.twitter) {
      entries.push({
        id: this.generateId(),
        eventId,
        type: "Twitter",
        url: socialMedia.urls.twitter,
        sequence: sequence++,
      });
    }

    const updated = [...allSocialMedia, ...entries];
    this.socialMediaSubject.next(updated);
    this.saveToStorage(updated);
    return entries;
  }

  updateSocialMedia(
    id: string,
    updates: Partial<Omit<SocialMediaEntry, "id" | "eventId">>,
  ): void {
    const socialMedia = this.getSocialMedia().map((entry) => {
      if (entry.id === id) {
        return { ...entry, ...updates };
      }
      return entry;
    });
    this.socialMediaSubject.next(socialMedia);
    this.saveToStorage(socialMedia);
  }

  deleteSocialMedia(id: string): void {
    const socialMedia = this.getSocialMedia().filter(
      (entry) => entry.id !== id,
    );
    this.socialMediaSubject.next(socialMedia);
    this.saveToStorage(socialMedia);
  }

  private saveToStorage(socialMedia: SocialMediaEntry[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(socialMedia));
  }

  private generateId(): string {
    return `social_media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
