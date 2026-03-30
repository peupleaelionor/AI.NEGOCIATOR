import os
import logging

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")


def send_coaching_offer(email: str):
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured. Email not sent.")
        return

    try:
        import resend

        resend.api_key = RESEND_API_KEY
        resend.Emails.send(
            {
                "from": "equipe@ai-negotiator.com",
                "to": email,
                "subject": "🚀 Boostez vos négociations avec un coaching personnalisé",
                "html": """
                <p>Vous avez analysé plusieurs offres cette semaine !</p>
                <p>Réservez un appel avec un expert pour seulement 99€/h.</p>
                <a href="https://ai-negotiator.com/coaching">Réserver maintenant</a>
                """,
            }
        )
        logger.info(f"Coaching offer email sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send coaching email to {email}: {e}")
