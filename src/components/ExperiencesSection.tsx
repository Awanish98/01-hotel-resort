import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { experiences } from '../data';

interface ExperiencesSectionProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
  onEnquire: () => void;
}

export default function ExperiencesSection({
  selectedIds,
  onToggle,
  onClear,
  onEnquire,
}: ExperiencesSectionProps) {
  const count = selectedIds.length;

  return (
    <section id="experiences" className="experiences-section" aria-labelledby="experiences-title">
      <div className="container">
        <div className="section-heading section-heading-light">
          <div>
            <p className="eyebrow section-label">03 / Experiences</p>
            <h2 id="experiences-title">A day with no hurry in it.</h2>
          </div>
          <p>
            Choose the sample rituals that appeal, then carry them into the enquiry. Experiences,
            timings and treatments below are illustrative only.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((experience) => {
            const selected = selectedIds.includes(experience.id);
            return (
              <article key={experience.id} className={`experience-card${selected ? ' is-selected' : ''}`}>
                <div className="experience-image image-fallback">
                  <img
                    src={experience.image}
                    alt={experience.imageAlt}
                    width={experience.width}
                    height={experience.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="experience-body">
                  <p className="eyebrow">{experience.kicker}</p>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <button
                    type="button"
                    className={`experience-toggle${selected ? ' is-selected' : ''}`}
                    aria-pressed={selected}
                    aria-label={`${selected ? 'Remove' : 'Add'} ${experience.title} ${selected ? 'from' : 'to'} the sample plan`}
                    onClick={() => onToggle(experience.id)}
                  >
                    {selected ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
                    {selected ? 'Added to plan' : 'Add to plan'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="experience-summary" aria-live="polite">
          <div>
            <p className="eyebrow">Your sample plan</p>
            <p className="summary-text">
              {count === 0
                ? 'No experiences selected yet — the enquiry still works without them.'
                : `${count} ${count === 1 ? 'experience' : 'experiences'} selected for your sample enquiry.`}
            </p>
          </div>
          <div className="summary-actions">
            {count > 0 && (
              <button type="button" className="summary-clear" onClick={onClear}>
                Clear selection
              </button>
            )}
            <button type="button" className="button button-brass" onClick={onEnquire}>
              Enquire about experiences <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul className="amenities-strip" aria-label="Sample amenities — confirm with client">
          <li>Sample pool access</li>
          <li>Sample garden walks</li>
          <li>Sample spa treatments</li>
          <li>Sample Wi-Fi</li>
          <li>Sample breakfast service</li>
        </ul>
      </div>
    </section>
  );
}
