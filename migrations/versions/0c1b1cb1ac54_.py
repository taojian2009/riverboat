"""empty message

Revision ID: 0c1b1cb1ac54
Revises: 7533ffd97bc9
Create Date: 2021-09-11 21:35:27.306612

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0c1b1cb1ac54'
down_revision = '7533ffd97bc9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password_hash', sa.String(length=128), nullable=False))
    op.add_column('user', sa.Column('mobile', sa.String(length=11), nullable=False))
    op.add_column('user', sa.Column('real_name', sa.String(length=32), nullable=True))
    op.add_column('user', sa.Column('avatar_url', sa.String(length=128), nullable=True))
    op.alter_column('user', 'id',
               existing_type=mysql.INTEGER(),
               comment=None,
               existing_comment='id主键',
               existing_nullable=False,
               autoincrement=True)
    op.alter_column('user', 'username',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False,
               comment=None,
               existing_comment='username')
    op.create_unique_constraint(None, 'user', ['username'])
    op.create_unique_constraint(None, 'user', ['mobile'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.alter_column('user', 'username',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True,
               comment='username')
    op.alter_column('user', 'id',
               existing_type=mysql.INTEGER(),
               comment='id主键',
               existing_nullable=False,
               autoincrement=True)
    op.drop_column('user', 'avatar_url')
    op.drop_column('user', 'real_name')
    op.drop_column('user', 'mobile')
    op.drop_column('user', 'password_hash')
    # ### end Alembic commands ###
