export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_details: Json | null;
          activity_type: string;
          board_id: number | null;
          id: number;
          timestamp: string | null;
          user_id: number | null;
        };
        Insert: {
          activity_details?: Json | null;
          activity_type: string;
          board_id?: number | null;
          id?: number;
          timestamp?: string | null;
          user_id?: number | null;
        };
        Update: {
          activity_details?: Json | null;
          activity_type?: string;
          board_id?: number | null;
          id?: number;
          timestamp?: string | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'activity_logs_board_id_fkey';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'boards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activity_logs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      boards: {
        Row: {
          column_ids: number[] | null;
          id: number;
          name: string;
          workspace_id: number | null;
        };
        Insert: {
          column_ids?: number[] | null;
          id?: number;
          name: string;
          workspace_id?: number | null;
        };
        Update: {
          column_ids?: number[] | null;
          id?: number;
          name?: string;
          workspace_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'boards_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
      columns: {
        Row: {
          board_id: number | null;
          id: number;
          name: string;
          task_ids: number[] | null;
        };
        Insert: {
          board_id?: number | null;
          id?: number;
          name: string;
          task_ids?: number[] | null;
        };
        Update: {
          board_id?: number | null;
          id?: number;
          name?: string;
          task_ids?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'columns_board_id_fkey';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'boards';
            referencedColumns: ['id'];
          }
        ];
      };
      tasks: {
        Row: {
          column_id: number | null;
          id: number;
          name: string;
        };
        Insert: {
          column_id?: number | null;
          id?: number;
          name: string;
        };
        Update: {
          column_id?: number | null;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_column_id_fkey';
            columns: ['column_id'];
            isOneToOne: false;
            referencedRelation: 'columns';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          board_ids: number[] | null;
          email: string;
          id: number;
          password: string;
          username: string;
          workspace_ids: number[] | null;
        };
        Insert: {
          board_ids?: number[] | null;
          email: string;
          id?: number;
          password: string;
          username: string;
          workspace_ids?: number[] | null;
        };
        Update: {
          board_ids?: number[] | null;
          email?: string;
          id?: number;
          password?: string;
          username?: string;
          workspace_ids?: number[] | null;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          board_ids: number[] | null;
          id: number;
          name: string;
          user_id: number | null;
        };
        Insert: {
          board_ids?: number[] | null;
          id?: number;
          name: string;
          user_id?: number | null;
        };
        Update: {
          board_ids?: number[] | null;
          id?: number;
          name?: string;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'workspaces_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
