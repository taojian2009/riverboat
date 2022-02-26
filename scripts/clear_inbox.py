from sqlalchemy import create_engine, and_
import logging
from server.model import Membership
import imaplib
import email
from email.header import decode_header

from config import Config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

logging.basicConfig(level=Config.Log_LEVEL, format=Config.LOG_FORMAT, filemode='a')
logger = logging.getLogger(__name__)


def get_engine():
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    return engine


def get_session():
    engine = get_engine()
    session = sessionmaker(bind=engine)()
    return session


def delete_all_emails(username, password):
    logger.info("start to delete all emails for account: %s", username)
    # create an IMAP4 class with SSL
    mail = imaplib.IMAP4_SSL('imap.gmail.com')
    mail.login(username, password)
    mail.select('inbox')
    logger.info('login successful with %s, start to enter inbox', username)
    status, data = mail.search(None, 'ALL')
    mail_ids = []
    for block in data:
        mail_ids += block.split()
    final_mail = None
    count = 1
    for i in mail_ids:
        mail.store(i, "+FLAGS", "\\Deleted")
        logger.info("%s mail has been removed", str(count))
        count += 1
    mail.close()
    mail.logout()
    logger.info("successfully delete %s emails for account: %s", str(count), username)


def clear_inbox(session):
    memberships = session.query(Membership).filter(
        and_(Membership.name.startswith('educative'), Membership.pwd is not None)).all()
    for membership in memberships:
        email = membership.account.strip()
        pwd = membership.pwd.strip()
        logger.info("successfully get account %s with password", email)
        delete_all_emails(email, pwd)


if __name__ == '__main__':
    session = get_session()
    clear_inbox(session)
