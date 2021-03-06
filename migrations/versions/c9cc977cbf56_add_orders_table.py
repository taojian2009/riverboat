"""add_orders_table

Revision ID: c9cc977cbf56
Revises: 3dcce1578e20
Create Date: 2020-12-20 12:03:48.463588

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9cc977cbf56'
down_revision = '3dcce1578e20'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders',
    sa.Column('create_time', sa.DateTime(), nullable=True, comment='创建时间'),
    sa.Column('update_time', sa.DateTime(), nullable=True, comment='更新时间'),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, comment='id主键'),
    sa.Column('buyer_email', sa.String(length=50), nullable=True, comment='用户电话'),
    sa.Column('buyer_phone', sa.String(length=50), nullable=True, comment='会员名称'),
    sa.Column('start_time', sa.DateTime(), nullable=True, comment='会员开始时间'),
    sa.Column('duration', sa.Integer(), nullable=True, comment='会员时长|天'),
    sa.Column('membership_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.String(length=50), nullable=True, comment='订单ID'),
    sa.ForeignKeyConstraint(['membership_id'], ['membership.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders')
    # ### end Alembic commands ###
